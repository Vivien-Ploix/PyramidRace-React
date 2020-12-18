import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { authSuccess } from "../../redux/authentication/authActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickLogin = (e) => {
    e.preventDefault();
    let data = {
      user: {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      },
    };
    fetch("https://pyramid-race-api.herokuapp.com/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        for (var pair of response.headers.entries()) {
          if (pair[0] === "authorization") {
            Cookies.set("token", pair[1]);
          }
        }
        return response.json();
      })
      .then((response) => {
        dispatch(authSuccess(response));
        history.push("/");
      })
      .catch((error) => alert("Vos informations sont incorrects"));
  };
  return (
    <div>
      <section
        id="contact"
        className="contact-area"
        style={{ marginBottom: "50px", marginTop: "50px" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center pb-10">
                <h3 className="title">Se connecter</h3>
                <p className="text">
                  Avant d'escalader la pyramide, il faut décliner ton identité !
                  <br></br>
                  Il serait regrettable que ton nom n'entre pas dans l'histoire
                  ...
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form">
                <form
                  id="contact-form"
                  method="post"
                  onSubmit={handleClickLogin}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-form form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Tape ton adresse mail (pas trop fort)"
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-form form-group">
                        <input
                          placeholder="Tape ton mot de passe (idem)"
                          type="password"
                          name="password"
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-form form-group text-center">
                        <button type="submit" className="main-btn">
                          Me connecter
                        </button>
                      </div>
                    </div>
                    <img
                      src="/assets/images/aztequelog.png"
                      alt="aztequelog"
                      style={{ marginTop: "100px" }}
                    ></img>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
