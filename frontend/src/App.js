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

function App() {

  const sessionUser = useSelector(state => state.session.user);
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await csrfFetch('/api/posts');
      setPost(await res.json());
    }
    fetchPosts();
  }, [])

  return (
    <>
      <SessionContext.Provider value={sessionUser}>
        <Switch>
          <Route path="/discover">
            <Header />
            <Navbar>
              <ProfileNavItem>
                <ProfileDropdown />
              </ProfileNavItem>
              <NavSearch />

              <NavItem icon={<BellIcon />} />
              <NavItem icon={<MailIcon />} />
              <NavItem icon={<DotsIcon />}>
                <SessionDropdown />
              </NavItem>
            </Navbar>
            <DiscoverPage />
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
      </SessionContext.Provider>

    </>
  );
}

export default App;
