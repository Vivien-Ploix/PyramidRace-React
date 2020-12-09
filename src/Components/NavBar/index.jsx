import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux" 
import { logoutSuccess } from '../../redux/authentication/authActions'




const NavBar = () => {


  const tokenCookie = Cookies.get('token')
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()


  const handleClickLogout = () => {
      fetch('https://pyramid-race-api.herokuapp.com/logout', {
        method: 'delete',
        Bearer: {
          'token': `${tokenCookie}`, 
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response)
        console.log(Cookies.get("token"))
        Cookies.remove("token")
        dispatch(logoutSuccess())
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log('isLoggedIn changed')
  }, [isLoggedIn])

  return (
    <div class="navgition navgition-transparent">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg">
              <Link to="/">
                <img src="assets/images/logo.svg" alt="Logo"></img>
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarOne"
                aria-controls="navbarOne"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="toggler-icon"></span>
                <span class="toggler-icon"></span>
                <span class="toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse sub-menu-bar" id="navbarOne">
                <ul class="navbar-nav m-auto">
                  <li class="nav-item">
                    <Link to="/">Accueil</Link>
                  </li>
                  <li class="nav-item">
                    <a className="page-scroll" href="/#information">
                      Informations
                    </a>
                  </li>
                  { tokenCookie && (
                    <li class="nav-item">
                      <Link to="/" onClick={handleClickLogout}>Se déconnecter</Link>
                    </li>
                  )}
                  { !tokenCookie && (
                    <>
                      <li class="nav-item">
                        <Link to="/sign-up">S'incrire</Link>
                      </li>
                      <li class="nav-item">
                        <Link to="/login">Se connecter</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div class="navbar-social d-none d-sm-flex align-items-center">
                <span>NOS RESEAUX</span>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/PyramidRace" target="_blank">
                      {" "}
                      <i class="lni-facebook-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/RacePyramid" target="_blank">
                      {" "}
                      <i class="lni-twitter-original"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/pyramid.race/" target="_blank">
                      {" "}
                      <i class="lni-instagram-original"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      {" "}
                      <i class="lni-linkedin-original"></i>
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
