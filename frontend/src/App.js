import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SplashPage from "./components/SplashPage";
import DiscoverPage from "./components/Discover";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Switch>
        <Route path="/discover">
          <Header />
          <Navbar />
          <DiscoverPage />
        </Route>
        <Route path={"/"}>
          <SplashPage />
        </Route>
    </Switch>
    </>
  );
}

export default App;
