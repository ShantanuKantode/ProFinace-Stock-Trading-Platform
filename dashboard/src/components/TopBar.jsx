import React from "react";

import Menu from "./Menu";

import { useAuth } from "../context/AuthContext";


const TopBar = () => {
  const { user } =
    useAuth();


  return (
    <div className="topbar-container">

      <div className="indices-container">

        <div className="nifty">

          <p className="index">
            NIFTY 50
          </p>

          <p className="index-points">
            100.2
          </p>

          <p className="percent"></p>

        </div>


        <div className="sensex">

          <p className="index">
            SENSEX
          </p>

          <p className="index-points">
            100.2
          </p>

          <p className="percent"></p>

        </div>

      </div>


      <div
        style={{
          marginRight: "20px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        {user?.name}
      </div>


      <Menu />

    </div>
  );
};


export default TopBar;