import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { isLoggedIn, user, setUser } = props;

  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#D7BDE2", height: "130px" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              className="logo"
              src="../images/LogoNutritherapy.png"
              style={{
                height: "9vmin",
                marginTop: "30px",
                marginLeft: "-70px",
                width: "500px",
              }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {isLoggedIn && user && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <div>
                    <NavLink to="/recipes/create">
                      <button
                        className="btn btn-secondary:hover"
                        style={{
                          padding: "10px",
                          margin: "10px",
                          width: "100px",
                          backgroundColor: "#4E6380",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        Create Recipe
                      </button>
                    </NavLink>
                  </div>
                </li>
                <li className="nav-item">
                  <div>
                    <div>
                      <NavLink to="/recipes/list">
                        <button
                          className="btn btn-secondary:hover"
                          style={{
                            padding: "10px",
                            margin: "10px",
                            width: "100px",
                            backgroundColor: "#4E6380",
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          Search Recipe
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
          <div>
            {isLoggedIn && user && (
              <div class="row">
                <div class="col-md-12">
                  <img
                    src="../images/user.png"
                    alt="userimg"
                    style={{
                      marginLeft: "-100px",
                      width: "100px",
                      height: "7vmin",
                    }}
                  />

                  <h3>Hi,{user.username}</h3>

                  <div>
                    <NavLink to="/">
                      <button
                        className="btn btn-secondary:hover"
                        style={{
                          padding: "10px",
                          margin: "10px",
                          width: "100px",
                          backgroundColor: "#4E6380",
                          color: "white",
                          fontWeight: "600",
                        }}
                        onClick={logoutUser}
                      >
                        Logout
                      </button>
                    </NavLink>

                    <NavLink to="/private">
                      <button
                        className="btn btn-secondary:hover"
                        style={{
                          padding: "10px",
                          margin: "10px",
                          width: "100px",
                          backgroundColor: "#4E6380",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        Private
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
            {!isLoggedIn && (
              <>
                <div>
                  <NavLink to="/signup">
                    <button
                      class="btn btn-secondary:hover"
                      style={{
                        padding: "10px",
                        margin: "10px",
                        width: "100px",
                        backgroundColor: "#4E6380",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Signup
                    </button>
                  </NavLink>
                  <NavLink to="/login">
                    <button
                      class="btn btn-secondary:hover"
                      style={{
                        padding: "10px",
                        margin: "10px",
                        width: "100px",
                        backgroundColor: "#4E6380",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Login
                    </button>
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
