import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux';
import Header from "./components/Header";
import SplashPage from "./components/SplashPage";
import DiscoverPage from "./components/Discover";
import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import {ReactComponent as BellIcon } from './assets/icons/bell.svg';
import {ReactComponent as MailIcon } from './assets/icons/mail.svg';
import {ReactComponent as DotsIcon } from './assets/icons/dots.svg';
import SessionDropdown from "./components/SessionDropdown";
import { SessionContext } from './Context/SessionContext';
import NavSearch from "./components/NavSearch";
import ProfileNavItem from "./components/ProfileNavItem";
import ProfileDropdown from "./components/ProfileDropdown";
import csrfFetch from "./store/csrf";
import PostIndex from "./components/PostIndex";
import PostForm from "./components/PostForm";
import UploadFormPage from "./components/UploadFormPage";
import AudioPlayerBar from "./components/AudioPlayerBar";

function App() {

  const sessionUser = useSelector(state => state.session.user);
  const [posts, setPost] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await csrfFetch('/api/posts');
      setPost(await res.json());
    }

    const fetchTracks = async () => {
      const trackList = await csrfFetch('/api/tracks');
      setTracks(await trackList.json())
    }

    fetchPosts();
    fetchTracks();
  }, [])

  return (
    <>
      <SessionContext.Provider value={sessionUser}>
        <Header />
        <Switch>
          <Route path="/discover">
            <DiscoverPage tracks={tracks}/>
            <PostForm />
            <PostIndex posts={posts} />
          </Route>

          <Route path={"/upload"}>
            <Header />
            <UploadFormPage />
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
