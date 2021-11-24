import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";
import logo from "../assets/LogoNutritherapy.png";
import userImage from "../assets/user.png";

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
        style={{ backgroundColor: "#D7BDE2", height: "170px" }}
      >
        <div className="container-fluid">
          <img
            className="logo"
            src={logo}
            style={{
              height: "11vmin",
              marginTop: "20px",
              marginLeft: "40px",
              width: "500px",
            }}
          />

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
              <div className="row">
                <NavLink to={`/profile/${user._id}`}>
                  <button
                    style={{
                      marginLeft: "-600px",
                      marginRight: "-30px",
                      marginTop: "100px",
                    }}
                  >
                    <img
                      src={userImage}
                      alt="userImg"
                      style={{
                        backgroundImage: "../assets/user.png",
                        //margin: "cover",
                        width: "70px",
                        height: "70px",
                      }}
                    />
                  </button>
                </NavLink>

                <div
                  className="col-md-6"
                  style={{
                    marginTop: "-80px",
                    marginLeft: "-50px",
                  }}
                >
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
                  </div>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    marginTop: "20px",
                    marginRight: "100px",
                    width: "100px",
                    height: "7vmin",
                  }}
                >
                  <NavLink to="/profile/list">
                    <button
                      className="btn btn-secondary:hover"
                      style={{
                        padding: "10px",
                        marginTop: "-80px",
                        width: "150px",
                        backgroundColor: "#4E6380",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Community
                    </button>
                  </NavLink>
                </div>
              </div>
            )}
            {!isLoggedIn && (
              <>
                <div>
                  <NavLink to="/signup">
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
                      Signup
                    </button>
                  </NavLink>
                  <NavLink to="/login">
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
