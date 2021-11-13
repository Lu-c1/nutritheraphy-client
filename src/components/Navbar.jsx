import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";

const Navbar = (props) => {
  const { isLoggedIn, user, setUser } = props;

  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  return (
    <div>
      <div>
        <img
          src="../images/LogoNutritherapy.png"
          style={{ width: "480px", height: "300px" }}
        />
      </div>
      <div>
        {isLoggedIn && user && (
          <>
            <h1>Hi,{user.username}</h1>

            <div>
              <NavLink to="/">
                <button onClick={logoutUser}>Logout</button>
              </NavLink>
            </div>

            <div>
              <NavLink to="/recipes">
                <button>Search Recipe</button>
              </NavLink>
            </div>

            <div>
              <NavLink to="/recipes/create">
                <button>Create Recipe</button>
              </NavLink>
            </div>
          </>
        )}

        {!isLoggedIn && (
          <>
            <div>
              <NavLink to="/signup">
                <button>Signup</button>
              </NavLink>
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
