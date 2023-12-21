import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import AccountPage from "./components/AccountPage/TravelerDashboard";
import GroupDetails from "./components/Groups/GroupDetails/GroupDetails";
import TravelersProfile from "./components/TravelersProfile/TravelersProfile";
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UsersFormPage from './components/UsersFormPage/index';
import TravelerJournal from "./components/Journals/TravelerJournal/TravelerJournal";
import CreateJournalFormm from "./components/Journals/CreateJournalForm/CreateJournalFormm";
import JournalUpdateForm from "./components/Journals/UpdateJournalForm/UpdateJournalForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute path="/travelers" component={TravelersProfile} />
          <ProtectedRoute exact path="/account" component={AccountPage} />
          <ProtectedRoute exact path="/groups/:groupId" component={GroupDetails} />
          <ProtectedRoute exact path="/journals/new" component={CreateJournalFormm} />
          <ProtectedRoute exact path="/journals/:journalId/edit" component={JournalUpdateForm} />
          <ProtectedRoute exact path="/journals/:journalId" component={TravelerJournal} />

          <Route path="/user-form-page">
            <UsersFormPage />
          </Route>
          <Route path='*'>
            <ErrorPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
