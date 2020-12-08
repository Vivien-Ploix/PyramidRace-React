import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";



const NavBar = () => {
  return(
    
        <div class="navgition navgition-transparent">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <nav class="navbar navbar-expand-lg">
                    <a class="navbar-brand" href="/">
                       <img src="assets/images/logo.svg" alt="Logo"></img>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarOne" aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse sub-menu-bar" id="navbarOne">
                          <ul class="navbar-nav m-auto">
                                    <li class="nav-item">
                                        <Link to="/"  >Acceuil</Link>
                                    </li>
                                    <li class="nav-item">
                                        <a className="page-scroll" href="/#information">Informations</a>
                                    </li>
                                    <li class="nav-item">
                                    <Link to="/sign-up"  >S'incrire</Link>
                                    </li>
                                    <li class="nav-item">
                                    <Link to="/login" >Se connecter</Link>
                                    </li>
                            </ul>

                     </div>
                     
                     <div class="navbar-social d-none d-sm-flex align-items-center">
                                <span>NOS RESEAUX</span>
                                <ul>
                                    <li><a href="#"><i class="lni-facebook-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-twitter-original"></i></a></li>
                                    <li><a href="#"><i class="lni-instagram-original"></i></a></li>
                                    <li><a href="#"><i class="lni-linkedin-original"></i></a></li>                                  
                                </ul>
                            </div>
                        </nav> 
                    </div>
                </div>
            </div>
        </div>
             
    
      
) 
}


export default NavBar;