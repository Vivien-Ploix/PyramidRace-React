import React from "react";
import "./style.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="footer-area">
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright text-center">
                <p className="text">
                  THP Project by <Link to="/team">Les Incacahuète !</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
