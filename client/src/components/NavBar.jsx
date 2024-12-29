import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./NavBarStyling.css";

const NavBar = () => {
  return (
    <div>
      <div className="MainContainer">
        <div className="image-container">
          <img src="../images/KQueLogo.png" alt="Logo" />
        </div>
        <div className="someDecoration"></div>
        <div className="route-to-chosenPage">
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
          <Link to="#">Services</Link>
          <Link to="#">Queue</Link>
          <Link to="#">Schedule</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
