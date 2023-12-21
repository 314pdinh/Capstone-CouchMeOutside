import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateJournalThunk, loadUserJournalsThunk, loadAllJournalsThunk } from '../../../store/journal';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const JournalUpdateForm = () => {
    console.log('UPDATING JOURNAL NOWWWWW')
    const dispatch = useDispatch();
    const history = useHistory();

    const journals = useSelector((state) => state.journals.allJournals)
    const { journalId } = useParams()

    const journal = journals ? journals[journalId] : null

    console.log('this is the JOUR HEREEEEE', journal)

    console.log('this is the JOURNALLLLLL HEREEEEE', journals)
    console.log('this is the JOURNALLLLLLIDDDD HEREEEEE', journalId)


    const user = useSelector((state) => state.session.user);

    const { closeModal } = useModal();

    const [name, setName] = useState(journal?.name);
    const [countryName, setCountryName] = useState(journal?.countryName);

    const [drinksReview, setDrinksReview] = useState(journal?.drinksReview);
    const [foodReview, setFoodReview] = useState(journal?.foodReview);
    const [friendlinessReview, setFriendlinessReview] = useState(journal?.friendlinessReview);
    const [cleanlinessReview, setCleanlinessReview] = useState(journal?.cleanlinessReview);
    const [sightSeeingReview, setSightSeeingReview] = useState(journal?.sightSeeingReview);


    const [noteDescription, setNoteDescription] = useState(journal?.noteDescription);
    const [memoryDescription, setMemoryDescription] = useState(journal?.memoryDescription);
    const [countryFlagImage, setCountryFlagImage] = useState(journal?.countryFlagImage || '');
    const [journalImage, setJournalImage] = useState(journal?.journalImage || '');
    const [secondaryImage, setSecondaryImage] = useState(journal?.secondaryImage || '');
    const [thirdImage, setThirdImage] = useState(journal?.thirdImage || '');
    const [fourthImage, setFourthImage] = useState(journal?.fourthImage || '');
    


    const [error, setError] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        if (!name.length || name.length > 35 || name.length < 5)
            newErrors.push('Name must be between 5 and 35 characters');
        if (!countryName.length || countryName.length > 255)
            newErrors.push("Country's name must be between 1 and 255 characters");
        if (!noteDescription.length || noteDescription.length > 255 || noteDescription.length < 25)
            newErrors.push("Note's description must be between 25 and 255 characters");
        if (!memoryDescription.length || memoryDescription.length > 255 || memoryDescription.length < 25)
            newErrors.push("Memory's description must be between 25 and 255 characters");

        if (!drinksReview || !foodReview || !friendlinessReview || !cleanlinessReview || !sightSeeingReview)
            newErrors.push('please add in reviews');

        if (!countryFlagImage || !journalImage || !secondaryImage || !thirdImage || !fourthImage)
            newErrors.push('Please add all five images');
        if (newErrors.length) {
            setError(newErrors);
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('country_name', countryName);

        form.append("drinks_review", drinksReview);
        form.append("food_review", foodReview);
        form.append("friendliness_review", friendlinessReview);
        form.append("cleanliness_review", cleanlinessReview);
        form.append("sight_seeing_review", sightSeeingReview);

        form.append('note_description', noteDescription);
        form.append('memory_description', memoryDescription);
        form.append('country_flag_image', countryFlagImage);
        form.append('journal_image', journalImage);
        form.append('secondary_image', secondaryImage);
        form.append('third_image', thirdImage);
        form.append('fourth_image', fourthImage);
        form.append("id", journal.id);

        console.log('Form data ---- handleSubmit:', form);

        dispatch(updateJournalThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error);
            } else {
                console.log('Update successful. Response data:', responseData);
                history.push(`/account`);
                closeModal();
                dispatch(loadUserJournalsThunk(user.id));
            }
        });
    };


    useEffect(() => {
        setError({});
        dispatch(loadAllJournalsThunk())
    }, [dispatch]);


    return (
        <>

            <div className="individiual-journal-container">
                <h1>Update Journal</h1>

                <div className="journal-container">
                    <form className="form-boxx" onSubmit={handleSubmit} encType="multipart/form-data">









                        <label htmlFor="journal-description">New Journal Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="journal-country-name">New Country Name</label>
                        <input
                            type="text"
                            value={countryName}
                            onChange={(e) => setCountryName(e.target.value)}
                        />

                        <label htmlFor="cleanliness-review">New Cleanliness Review</label>
                        <select
                            value={cleanlinessReview}
                            onChange={(e) => setCleanlinessReview(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <label htmlFor="friendliness-review">New Friendliness Review</label>
                        <select
                            value={friendlinessReview}
                            onChange={(e) => setFriendlinessReview(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <label htmlFor="sightseeing-review">New Sightseeing Review</label>
                        <select
                            value={sightSeeingReview}
                            onChange={(e) => setSightSeeingReview(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <label htmlFor="food-review">New Food Review</label>
                        <select
                            value={foodReview}
                            onChange={(e) => setFoodReview(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <label htmlFor="drinks-review">New Drinks Review</label>
                        <select
                            value={drinksReview}
                            onChange={(e) => setDrinksReview(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <label htmlFor="journal-note-description">New Note Description</label>
                        <input
                            type="text"
                            value={noteDescription}
                            onChange={(e) => setNoteDescription(e.target.value)}
                        />

                        <label htmlFor="journal-memory-description">New Memory Description</label>
                        <input
                            type="text"
                            value={memoryDescription}
                            onChange={(e) => setMemoryDescription(e.target.value)}
                        />

                        <label htmlFor="country-flag-image">New Country Flag Image</label>
                        <input
                            type="file"
                            onChange={(e) => setCountryFlagImage(e.target.files[0])}
                            accept="image/*"
                        ></input>

                        <label htmlFor="journal-image">New Journal Image</label>
                        <input
                            type="file"
                            onChange={(e) => setJournalImage(e.target.files[0])}
                            accept="image/*"
                        ></input>

                        <label htmlFor="secondary-image">New Secondary Image</label>
                        <input
                            type="file"
                            onChange={(e) => setSecondaryImage(e.target.files[0])}
                            accept="image/*"
                        />
                        <label htmlFor="third-image">New Third Image</label>
                        <input
                            type="file"
                            onChange={(e) => setThirdImage(e.target.files[0])}
                            // onChange={(e) => {
                            //     console.log('Selected THIRD Image:', e.target.files[0]);
                            //     setThirdImage(e.target.files[0]);
                            // }}
                            accept="image/*"
                        />

                        <label htmlFor="fourth-image">New Fourth Image</label>
                        <input
                            type="file"
                            onChange={(e) => setFourthImage(e.target.files[0])}
                            // onChange={(e) => {
                            //     console.log('Selected Fourth Image:', e.target.files[0]);
                            //     setFourthImage(e.target.files[0]);
                            // }}
                            accept="image/*"
                        />

                        <div className='update-button' style={{ textAlign: 'center' }}>

                            {error.length
                                ? error.map((e, index) => <p key={index} className='create-error'>{e}</p>)
                                : null}


                            <button type="submit" className="updbtn" >
                                Update Journal
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );

}

export default JournalUpdateForm;