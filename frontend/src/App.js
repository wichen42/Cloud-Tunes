import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Header from "./components/Header";
import SplashPage from "./components/SplashPage";
import DiscoverPage from "./components/Discover";
import { SessionContext } from './Context/SessionContext';
import csrfFetch from "./store/csrf";
import UploadFormPage from "./components/UploadFormPage";
import AudioPlayerBar from "./components/AudioPlayerBar";
import UserProfilePage from "./components/UserProfilePage";
import { fetchUsers } from "./store/users";
import { withRoute } from "react-router";

function App({location}) {
  // {location.pathname !== '/exclusion-path' && <Header/>}
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [tracks, setTracks] = useState([]);
  
  useEffect(() => {
    const fetchTracks = async () => {
      const trackList = await csrfFetch('/api/tracks');
      setTracks(await trackList.json())
    }
    
    dispatch(fetchUsers());
    
    fetchTracks();
  }, [])
  
  return (
    <>
      <SessionContext.Provider value={sessionUser}>
        <Header />
        <Switch>
          <Route path="/discover">
            <DiscoverPage tracks={tracks}/>
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
        <AudioPlayerBar tracks={tracks}/>
      </SessionContext.Provider>

    </>
  );
}

export default App;
