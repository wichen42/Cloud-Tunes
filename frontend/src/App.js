import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import LoginFormPage from "./components/LoginForm";
import SplashPage from "./components/Splash";


function App() {
  return (
    <>
      <Switch>
        <Route path={"/login"}>
          <LoginFormPage />
        </Route>
        <Route path={"/"}>
          <SplashPage />
        </Route>
    </Switch>
    </>
  );
}

export default App;
