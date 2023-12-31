// import React, { useState } from "react";
// import { login } from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { NavLink } from "react-router-dom";
// import "./LoginForm.css";

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = await dispatch(login(email, password));
//     if (data) {
//       setErrors(data);
//     } else {
//         closeModal()
//     }
//   };

//   return (
//     <div className="login-form-modal">
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Log In</button>
//       </form>
//       <li className="sign-up-link">
//           <NavLink exact to="/signup" activeClassName="active-link">
//             Don't have an account? Sign up
//           </NavLink>
//         </li>
//     </div>
//   );
// }

// export default LoginFormModal;
