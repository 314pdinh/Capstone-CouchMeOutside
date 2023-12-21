
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleJournalThunk } from "../../../store/journal";
import OpenModalButton from '../../OpenModalButton';
import JournalUpdateModal from "../UpdateJournalForm/UpdateJournalForm";
import JournalDeleteModal from '../../Journals/DeleteJournalModal/DeleteJournalModal'
import './TravelerJournal.css';
import Map from "./GoogleMap";

const defaultImage =
  "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";

const TravelerJournal = () => {
  const { journalId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadSingleJournalThunk(journalId));

  }, [dispatch, journalId]);

  const journal = useSelector((state) => state.journals.singleJournal);
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const isOwner = userId === journal.ownerId;


  // const formatDate = (dateString) => {
  //   const dateObject = new Date(dateString);
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   return dateObject.toLocaleDateString("en-US", options);
  // };

  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i < rating ? "star-filled" : "star-empty"}`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="individiual-journal-container">
        {!journal ? (
          <div>Loading...</div>
        ) : (

          <div className="journal-container">



            <div className="journal-row1">

              <div className="journal-header">
                <div className="flag-image">
                  <img src={journal.countryFlagImage} alt="Country Flag Image" />
                </div>

                <div>
                  <img
                    className="journal-img4"
                    src={journal.fourthImage || defaultImage}
                    alt="Banner"
                  />
                </div>
              </div>


              <div className="map-container">
                <Map country={journal.countryName} />
              </div>



              <div className="reviews-sec">
                <div className="reviews-text">
                  <h2>Reviews</h2>
                  <p>
                    ✨ Cleanliness: {generateStars(journal.cleanlinessReview)}
                  </p>
                  <p>
                    🤗 Friendliness: {generateStars(journal.friendlinessReview)}
                  </p>
                  <p>
                    🏞️ Sight Seeing: {generateStars(journal.sightSeeingReview)}
                  </p>
                  <p>😋 Foods: {generateStars(journal.foodReview)}</p>
                  <p>🍹 Drinks: {generateStars(journal.drinksReview)}</p>
                </div>
                <div>
                  <img
                    className="journal-img1"
                    src={journal.journalImage || defaultImage}
                    alt="Banner"
                  />
                </div>
              </div>

            </div>


            <div className="journal-row2">

              <div>
                <img
                  className="journal-img2"
                  src={journal.secondaryImage || defaultImage}
                  alt="Server"
                />
              </div>

              <div className="journal-description-content">
                <div className="notes-box">

                  <div className="name-box">
                    <h2 className="journal-name">{journal.name}</h2>
                  </div>


                  <p>Notes</p>
                  <p className="note-description">{journal.noteDescription}</p>
                </div>
              </div>


              <div className="memory-name-image-container">
                <img
                  className="journal-img3"
                  src={journal.thirdImage || defaultImage}
                  alt="Server"
                />
                <div className="memory-box">
                  <p>Favorite Memories</p>
                  <p className="note-description">{journal.memoryDescription}</p>
                  <div className="country-name">
                    <h1>
                      {journal.countryName}
                    </h1>
                  </div>
                </div>
              </div>

            </div>


            {/* <OpenModalButton
              className="journal-update-btn"
              id='update'
              buttonText='Update Journal'
              modalComponent={<JournalUpdateModal title='Update Journal' journal={journal} />}
            /> */}
            <div className='update-button'>

              <button onClick={
                (e) => {
                  e.preventDefault();
                  history.push(`/journals/${journalId}/edit`);
                }
              }> Update Journal </button>
            </div>
            <div className="delete-button">

              <OpenModalButton
                className='journal-delete-btn'
                id='delete'
                buttonText="Delete Journal"
                modalComponent={<JournalDeleteModal title='Delete Journal' journal={journal} />}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TravelerJournal;