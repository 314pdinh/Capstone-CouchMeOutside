import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profilePic, setProfilePic] = useState();
	const [profile_img1, setProfile_img1] = useState();
	const [profile_img2, setProfile_img2] = useState();

	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = [];

		if (!username.length) newErrors.push("Must include username");
		if (!password.length) newErrors.push("Must include password");
		if (!bio.length) newErrors.push("Must include bio about yourself");
		if (!email.length || !email.includes("@")) newErrors.push("Must include a valid email");
		if (username.length < 4 || 15 < username.length) newErrors.push("Username must be between 4 and 15 characters.");
		if (bio.length < 50 || 255 < bio.length) newErrors.push("Bio must be between 50 and 255 characters");
		if (password !== confirmPassword) newErrors.push("Passwords must match");
		if (password.length < 8 || 20 < password.length) newErrors.push("Password must be between 8 and 20 characters");

		if (!profilePic || !profilePic.name) newErrors.push("Profile pictures is required");
		const allowedExtensions = [".jpg", ".jpeg", ".png"];
		if (!allowedExtensions.some(ext => profilePic.name.toLowerCase().endsWith(ext))) {
			newErrors.push("Profile picture must be in JPG, JPEG, or PNG format.");
		}
		if (profilePic && profilePic.name && profilePic.name.length > 255) {
			newErrors.push("Max URL length exceeded (must be less than 255 characters)");
		}


		if (!profile_img1 || !profile_img1.name) newErrors.push("Profile pictures is required");
		if (!allowedExtensions.some(ext => profile_img1.name.toLowerCase().endsWith(ext))) {
			newErrors.push("Profile picture must be in JPG, JPEG, or PNG format.");
		}
		if (profile_img1 && profile_img1.name && profile_img1.name.length > 255) {
			newErrors.push("Max URL length exceeded (must be less than 255 characters)");
		}


		if (!profile_img2 || !profile_img2.name) newErrors.push("Profile pictures is required");
		if (!allowedExtensions.some(ext => profile_img2.name.toLowerCase().endsWith(ext))) {
			newErrors.push("Profile picture must be in JPG, JPEG, or PNG format.");
		}
		if (profile_img2 && profile_img2.name && profile_img2.name.length > 255) {
			newErrors.push("Max URL length exceeded (must be less than 255 characters)");
		}

		if (!newErrors.length) {
			const form = new FormData();
			form.append("email", email);
			form.append("username", username);
			form.append("password", password);
			form.append("bio", bio);
			form.append("profile_picture", profilePic);
			form.append("profile_img1", profile_img1);
			form.append("profile_img2", profile_img2);


			console.log("Form dataHEREEE:", form);

			const data = await dispatch(signUp(form));
			if (data) {
				setErrors(data);
			}
		}
		setErrors(newErrors);
	}

	return (
		<div className="sign-up-form-page">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul className="error-list">
					{errors.map((error, idx) => <li key={idx}>{error}</li>)}
				</ul>
				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					<h5>Profile Picture <i style={{ color: 'red' }}>*</i></h5>
					<input
						type="file"
						required
						onChange={(e) => setProfilePic(e.target.files[0])}
						accept="image/*"
					/>
				</label>
				<label>
					<h5>2nd Profile Picture <i style={{ color: 'red' }}>*</i></h5>
					<input
						type="file"
						required
						onChange={(e) => setProfile_img1(e.target.files[0])}
						accept="image/*"
					/>
				</label>
				<label>
					<h5>3rd Profile Picture <i style={{ color: 'red' }}>*</i></h5>
					<input
						type="file"
						required
						onChange={(e) => setProfile_img2(e.target.files[0])}
						accept="image/*"
					/>
				</label>

				<label htmlFor="bio-description">Bio Description</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
					required
                ></textarea>

				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className='login-button' type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormPage;