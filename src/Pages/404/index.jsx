import React from "react";
import NotFoundImage from "./assets/404.png";
import "./style.scss";

const NotFound = () => {
  return <img className="notFoundImage" src={NotFoundImage} />;
};

export default NotFound;
