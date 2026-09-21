import React, {
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const Menu = () => {
  const [
    selectedMenu,
    setSelectedMenu,
  ] = useState(0);


  const [
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
  ] = useState(false);


  const {
    user,
    logout,
  } = useAuth();


  const handleMenuClick = (
    index
  ) => {
    setSelectedMenu(index);
  };


  const handleProfileClick =
    () => {
      setIsProfileDropdownOpen(
        !isProfileDropdownOpen
      );
    };


  const menuClass = "menu";

  const activeMenuClass =
    "menu selected";


  return (
    <div className="menu-container">

      <img
        src="./logo.svg"
        style={{
          width: "80px",
        }}
        alt="Logo"
      />


      <div className="menus">

        <ul>

          <li>
            <Link
              style={{
                textDecoration:
                  "none",
              }}
              to="/"
              onClick={() =>
                handleMenuClick(0)
              }
            >
              <p
                className={
                  selectedMenu === 0
                    ? activeMenuClass
                    : menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>


          <li>
            <Link
              style={{
                textDecoration:
                  "none",
              }}
              to="/orders"
              onClick={() =>
                handleMenuClick(1)
              }
            >
              <p
                className={
                  selectedMenu === 1
                    ? activeMenuClass
                    : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>


          <li>
            <Link
              style={{
                textDecoration:
                  "none",
              }}
              to="/holdings"
              onClick={() =>
                handleMenuClick(2)
              }
            >
              <p
                className={
                  selectedMenu === 2
                    ? activeMenuClass
                    : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>


          <li>
            <Link
              style={{
                textDecoration:
                  "none",
              }}
              to="/positions"
              onClick={() =>
                handleMenuClick(3)
              }
            >
              <p
                className={
                  selectedMenu === 3
                    ? activeMenuClass
                    : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>


          <li>
            <Link
              style={{
                textDecoration:
                  "none",
              }}
              to="/funds"
              onClick={() =>
                handleMenuClick(4)
              }
            >
              <p
                className={
                  selectedMenu === 4
                    ? activeMenuClass
                    : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>


          <li>
            <Link
              style={{
                textDecoration:
                  "none",
              }}
              to="/apps"
              onClick={() =>
                handleMenuClick(6)
              }
            >
              <p
                className={
                  selectedMenu === 6
                    ? activeMenuClass
                    : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>

        </ul>


        <hr />


        <div
          className="profile"
          onClick={
            handleProfileClick
          }
        >

          <div className="avatar">
            {user?.name
              ?.substring(0, 2)
              .toUpperCase() ||
              "PF"}
          </div>

          <p className="username">
            {user?.name ||
              "USER"}
          </p>

        </div>


        {isProfileDropdownOpen && (
          <div
            style={{
              padding:
                "10px 15px",
              borderTop:
                "1px solid #eee",
            }}
          >

            <p
              style={{
                fontSize: "12px",
                color: "#777",
                marginBottom:
                  "10px",
              }}
            >
              {user?.email}
            </p>


            <button
              onClick={logout}
              style={{
                width: "100%",
                border: "none",
                background:
                  "#ff4d4f",
                color: "#fff",
                padding:
                  "8px 12px",
                borderRadius:
                  "4px",
                cursor:
                  "pointer",
              }}
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </div>
  );
};


export default Menu;