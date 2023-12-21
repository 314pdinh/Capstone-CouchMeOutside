// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { useModal } from '../../../context/Modal';
// import { createJournalThunk } from '../../../store/journal'
// import { loadUserJournalsThunk } from "../../../store/journal";
// import './CreateJournalForm.css';

// const CreateJournalModal = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.session.user);
//     const history = useHistory();
//     const { closeModal } = useModal();
//     const [name, setName] = useState('');
//     const [countryName, setCountryName] = useState('');

//     const [drinksReview, setDrinksReview] = useState(1);
//     const [foodReview, setFoodReview] = useState(1);
//     const [friendlinessReview, setFriendlinessReview] = useState(1);
//     const [cleanlinessReview, setCleanlinessReview] = useState(1);
//     const [sightSeeingReview, setSightSeeingReview] = useState(1);



//     const [noteDescription, setNoteDescription] = useState('');
//     const [memoryDescription, setMemoryDescription] = useState('');
//     const [countryFlagImage, setCountryFlagImage] = useState(null);
//     const [journalImage, setJournalImage] = useState(null);
//     const [secondaryImage, setSecondaryImage] = useState(null);
//     const [thirdImage, setThirdImage] = useState(null);
//     const [fourthImage, setFourthImage] = useState(null);
//     const [error, setError] = useState([]);
//     const [disableButton, setDisableButton] = useState(true);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newErrors = [];

//         if (!name.length || name.length > 255)
//             newErrors.push('Name must be between 1 and 255 characters');
//         if (!countryName.length || countryName.length > 255)
//             newErrors.push("Country's name must be between 1 and 255 characters");
//         if (!noteDescription.length || noteDescription.length > 255)
//             newErrors.push("Note's description must be between 1 and 255 characters");
//         if (!memoryDescription.length || memoryDescription.length > 255)
//             newErrors.push("Memory's description must be between 1 and 255 characters");

//         if (!drinksReview || !foodReview || !friendlinessReview || !cleanlinessReview || !sightSeeingReview)
//             newErrors.push('please add in reviews');

//         if (!countryFlagImage || !journalImage || !secondaryImage || !thirdImage || !fourthImage)
//             newErrors.push('Please add all five images');
//         if (newErrors.length) {
//             setError(newErrors);
//             setDisableButton(true);
//             return;
//         }

//         const form = new FormData();
//         form.append('name', name);
//         form.append('country_name', countryName);

//         form.append("drinks_review", drinksReview);
//         form.append("food_review", foodReview);
//         form.append("friendliness_review", friendlinessReview);
//         form.append("cleanliness_review", cleanlinessReview);
//         form.append("sight_seeing_review", sightSeeingReview);

//         form.append('note_description', noteDescription);
//         form.append('memory_description', memoryDescription);
//         form.append('country_flag_image', countryFlagImage);
//         form.append('journal_image', journalImage);
//         form.append('secondary_image', secondaryImage);
//         form.append('third_image', thirdImage);
//         form.append('fourth_image', fourthImage);

//         dispatch(createJournalThunk(form)).then((responseData) => {
//             if (responseData.error) {
//                 setError(responseData.error);
//             } else {
//                 history.push(`/account`);
//                 closeModal();
//                 dispatch(loadUserJournalsThunk(user.id));

//             }
//         });
//     };

//     useEffect(() => {
//         setDisableButton(false);
//         const newErrors = [];
//         if (!name.length || name.length > 255)
//             newErrors.push('Name must be between 1 and 255 characters');
//         if (!countryName.length || countryName.length > 255)
//             newErrors.push('Name must be between 1 and 255 characters');
//         if (!noteDescription.length || noteDescription.length > 255)
//             newErrors.push('Description for note must be between 1 and 255 characters');
//         if (!memoryDescription.length || memoryDescription.length > 255)
//             newErrors.push('Description for memory must be between 1 and 255 characters');

//         if (!drinksReview || !foodReview || !friendlinessReview || !cleanlinessReview || !sightSeeingReview)
//             newErrors.push('please add in reviews');

//         if (!countryFlagImage || !journalImage || !secondaryImage || !thirdImage || !fourthImage)
//             newErrors.push('Please add all four images');

//         if (newErrors.length) setDisableButton(true);
//     }, [name, countryName, noteDescription, drinksReview, foodReview, friendlinessReview, cleanlinessReview, sightSeeingReview, memoryDescription, countryFlagImage, journalImage, secondaryImage, thirdImage, fourthImage]);

//     return (
//         <div className='journalcreateback'>
//             <div className='create-wrapper'>
//                 <h1>Create a journal</h1>
//                 {error.length
//                     ? error.map((e, index) => <p key={index} className='create-error'>{e}</p>)
//                     : null}

//                 <form className='form-box' onSubmit={handleSubmit} encType='multipart/form-data'>
//                     <label htmlFor='journal-create-name'>journal Name <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='text'
//                         value={name}
//                         required
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder='What would you like to call this journal?'
//                     />

//                     <label htmlFor='journal-create-name'>country Name <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='text'
//                         value={countryName}
//                         required
//                         onChange={(e) => setCountryName(e.target.value)}
//                         placeholder='country name?'
//                     />


//                     <label htmlFor="cleanliness-review">Cleanliness Review</label>
//                     <select
//                         value={cleanlinessReview}
//                         onChange={(e) => setCleanlinessReview(parseInt(e.target.value))}
//                     >
//                         {Array.from({ length: 5 }, (_, index) => (
//                             <option key={index} value={index + 1}>{index + 1}</option>
//                         ))}
//                     </select>

//                     <label htmlFor="friendliness-review">Friendliness Review</label>
//                     <select
//                         value={friendlinessReview}
//                         onChange={(e) => setFriendlinessReview(parseInt(e.target.value))}
//                     >
//                         {Array.from({ length: 5 }, (_, index) => (
//                             <option key={index} value={index + 1}>{index + 1}</option>
//                         ))}
//                     </select>

//                     <label htmlFor="sightseeing-review">Sightseeing Review</label>
//                     <select
//                         value={sightSeeingReview}
//                         onChange={(e) => setSightSeeingReview(parseInt(e.target.value))}
//                     >
//                         {Array.from({ length: 5 }, (_, index) => (
//                             <option key={index} value={index + 1}>{index + 1}</option>
//                         ))}
//                     </select>

//                     <label htmlFor="food-review">Food Review</label>
//                     <select
//                         value={foodReview}
//                         onChange={(e) => setFoodReview(parseInt(e.target.value))}
//                     >
//                         {Array.from({ length: 5 }, (_, index) => (
//                             <option key={index} value={index + 1}>{index + 1}</option>
//                         ))}
//                     </select>

//                     <label htmlFor="drinks-review">Drinks Review</label>
//                     <select
//                         value={drinksReview}
//                         onChange={(e) => setDrinksReview(parseInt(e.target.value))}
//                     >
//                         {Array.from({ length: 5 }, (_, index) => (
//                             <option key={index} value={index + 1}>{index + 1}</option>
//                         ))}
//                     </select>

//                     <label htmlFor='journal-create-description'>note Description <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='text'
//                         value={noteDescription}
//                         required
//                         onChange={(e) => setNoteDescription(e.target.value)}
//                         placeholder='Describe your notes'
//                     />

//                     <label htmlFor='journal-create-description'>memory Description <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='text'
//                         value={memoryDescription}
//                         required
//                         onChange={(e) => setMemoryDescription(e.target.value)}
//                         placeholder='Describe your memory'
//                     />


//                     <label htmlFor='journal-create-image'>New country flag Image <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='file'
//                         name='journal-form-journal-image'
//                         required
//                         onChange={(e) => setCountryFlagImage(e.target.files[0])}
//                         accept='image/*'
//                     />


//                     <label htmlFor='journal-create-image'>New journal Image <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='file'
//                         name='journal-form-journal-image'
//                         required
//                         onChange={(e) => setJournalImage(e.target.files[0])}
//                         accept='image/*'
//                     />
//                     <label htmlFor='secondary-create-image'>New Secondary Image <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='file'
//                         name='journal-form-secondary-image'
//                         required
//                         onChange={(e) => setSecondaryImage(e.target.files[0])}
//                         accept='image/*'
//                     />
//                     <label htmlFor='third-create-image'>New Third Image <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='file'
//                         name='journal-form-third-image'
//                         required
//                         onChange={(e) => setThirdImage(e.target.files[0])}
//                         accept='image/*'
//                     />
//                     <label htmlFor='fourth-create-image'>New Fourth Image <i style={{ color: 'red' }}>*</i></label>
//                     <input
//                         type='file'
//                         name='journal-form-fourth-image'
//                         required
//                         onChange={(e) => setFourthImage(e.target.files[0])}
//                         accept='image/*'
//                     />
//                     <button
//                         className=''
//                         id='journal-form-submit-button'
//                         type='submit'
//                         disabled={disableButton}
//                     >
//                         Create journal
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateJournalModal;