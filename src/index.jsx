import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import GameInfos from "./Pages/GameInfos"

const App = () => {
  return (
    <div>
      
      <Router>
      <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/gameInfos">
            <GameInfos />
          </Route>
        </Switch>
        <Footer />
      </Router>
    
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
