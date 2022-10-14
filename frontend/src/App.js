import React from "react";
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

function App() {

  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

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
