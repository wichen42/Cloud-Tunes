import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Header from "./components/Header";
import SplashPage from "./components/SplashPage";
import DiscoverPage from "./components/Discover";
import { SessionContext } from './Context/SessionContext';
import UploadFormPage from "./components/UploadFormPage";
import AudioPlayerBar from "./components/AudioPlayerBar";
import UserProfilePage from "./components/UserProfilePage";
import { fetchUsers } from "./store/users";
import Library from "./components/Library";
import './components/FontAwesomeIcons';
import * as trackActions from "./store/track";
import * as sessionActions from './store/session';
import * as likeActions from './store/like';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(sessionActions.getSession);
  
  useEffect(() => {

    dispatch(trackActions.fetchTracks());
    dispatch(fetchUsers());
    dispatch(sessionActions.fetchSession);
    dispatch(likeActions.fetchLikes());
  }, [])
  
  return (
    <>
      <SessionContext.Provider value={sessionUser}>
        <Header />
        <Switch>
          <Route path="/discover">
            <DiscoverPage />
          </Route>

          <Route path="/library">
            <Library />
          </Route>

          <Route path={"/upload"}>
            <UploadFormPage />
          </Route>

          <Route path={"/users/:id"}>
            <UserProfilePage />
          </Route>

          <Route path={"/"}>
            <SplashPage />
          </Route>
        </Switch>
        <AudioPlayerBar />
      </SessionContext.Provider>
    </>
  );
}

export default App;
