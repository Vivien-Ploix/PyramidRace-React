import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/";
import Login from "./Pages/Login";
import GamePage from "./Pages/GamePage";
import SignUp from "./Pages/Signup";
import GameInfos from "./Pages/GameInfos";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Victory from "./Pages/Victory";
import Defeat from "./Pages/Defeat";
import Team from "./Pages/Team";
import NotFound from "./Pages/404";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              <Route exact path="/games/:id">
                <GamePage />
              </Route>
              <Route path="/games/:id/victory">
                <Victory />
              </Route>
              <Route path="/games/:id/defeat">
                <Defeat />
              </Route>
              <Route path="/team">
                <Team />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
