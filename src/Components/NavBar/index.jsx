import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/authentication/authActions";

const NavBar = () => {
  const tokenCookie = Cookies.get("token");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    fetch("https://pyramid-race-api.herokuapp.com/logout", {
      method: "delete",
      Bearer: {
        token: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        console.log(Cookies.get("token"));
        Cookies.remove("token");
        dispatch(logoutSuccess());
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("isLoggedIn changed");
  }, [isLoggedIn]);

  return (
    <div className="navgition navgition-transparent">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              <Link to="/">
                <img src="/assets/images/logo.svg" alt="Logo"></img>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarOne"
                aria-controls="navbarOne"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse sub-menu-bar"
                id="navbarOne"
              >
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                    <Link to="/">Accueil</Link>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="/#information">
                      Informations
                    </a>
                  </li>
                  {tokenCookie && (
                    <>
                      <li className="nav-item">
                        <Link to="/gameinfos">Profil</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" onClick={handleClickLogout}>
                          Se déconnecter
                        </Link>
                      </li>
                    </>
                  )}
                  {!tokenCookie && (
                    <>
                      <li className="nav-item">
                        <Link to="/sign-up">S'inscrire</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/login">Se connecter</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="navbar-social d-none d-sm-flex align-items-center">
                <span>NOS RESEAUX</span>
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/PyramidRace"
                      target="_blank"
                    >
                      {" "}
                      <i className="lni-facebook-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/RacePyramid" target="_blank">
                      {" "}
                      <i className="lni-twitter-original"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/pyramid.race/"
                      target="_blank"
                    >
                      {" "}
                      <i className="lni-instagram-original"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=RLoWrNB0fJE"
                      target="_blank"
                    >
                      {" "}
                      <i className="lni lni-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
