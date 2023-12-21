import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllJournalsThunk } from "../../../store/journal";
import { Link } from "react-router-dom";
// import OpenModalButton from "../../OpenModalButton";
import './AllJournals.css'


const Explore = () => {
  const dispatch = useDispatch();
  const journalsObj = useSelector((state) => state.journals.allJournals);
  // const journalsObj = useSelector((state) => console.log('stateHEREEE', state));

  const journalsList = Object.values(journalsObj);

  useEffect(() => {
    dispatch(loadAllJournalsThunk());
  }, [dispatch]);

  if (!journalsList) {
    return null;
  }

  return (
    <main>
      <div className="explore-welcome">
        <h1>journals ALL HERE</h1>
        <li className="">

        </li>
      </div>

      <ul className="journal-list">
        {journalsList.length > 0 &&
          journalsList.map((journal) => (
            <div key={journal.id} className="journal" title={journal.name}>
              <Link to={`/journals/${journal.id}`}>
                <div className="image">
                  <img src={journal.journalImage} alt="journal" />
                </div>
                <div className="details">

                  <li className="journal-name">{journal.name}</li>
                  {/* <li>{journal.owner.username}</li> */}
                  {/* <img src={journal.owner.profilePic}></img> */}
                  <li className="journal-description">{journal.countryName}</li>
                </div>


              </Link>
            </div>
          ))}
      </ul>
    </main>
  );
};

export default Explore;
