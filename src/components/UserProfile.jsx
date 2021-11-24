import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";

class UserProfile extends Component {
  state = {
    yourProfile: null,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/profile/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ yourProfile: response.data, isLoading: false });
      })
      .catch((err) => this.props.history.push("/500"));
  }
  handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/profile/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then(() => {
        // invoke the method that removes the user from App.js state
        this.props.history.push("/login");
      })
      .catch(() => this.props.history.push("/500"));
  };
  render() {
    const { yourProfile, isLoading } = this.state;
    return (
      <div className="container-fluid m-5 w-100">
        {isLoading && <BounceLoader color={"#D7BDE2"} size={90} />}
        {!isLoading && (
          <div>
            <h2> Your Profile </h2>
            <div
              className="card-deck d-sm-flex flex-row justify-content-center d-block m-auto mt-5"
              style={{
                height: "45rem",
                width: "90rem",
                backgroundColor: "#D9D5DB",
              }}
            >
              <img
                style={{ height: "30rem", width: "40rem" }}
                className="card-img-top w-40 mr-md-5"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxNbV-Jx4qPKQR3db2ue8zoHj5M94dEtMCg&usqp=CAU"
              />
              {/*  {yourProfile.image && (
                          <img src={yourProfile.image} alt="imageUser" />
                        )} */}

              <div className="card-body d-sm-flex flex-column align-items-start justify-content-start text-secondary m-2">
                <h4>
                  <strong> Username:</strong>
                  {yourProfile.username}
                </h4>

                <h4>
                  <strong>Name: </strong>
                  {yourProfile.name}
                </h4>

                <h4>
                  <strong>Last name:</strong> {yourProfile.lastName}
                </h4>

                <h4>
                  <strong>City:</strong> {yourProfile.city}
                </h4>

                <h4>
                  <strong>Country:</strong> {yourProfile.country}
                </h4>

                <h4>
                  <strong>Type Of Diet: </strong>
                  {yourProfile.typeOfDiet}
                </h4>
              </div>

              <div className="d-sm-flex flex-column justify-content-center align-items-start">
                <Link to={`/profile/${yourProfile._id}/edit`}>
                  <button
                    type="submit"
                    onClick={this.handleToggle}
                    style={{
                      padding: "10px",
                      margin: "10px",
                      width: "100px",
                      backgroundColor: "#4E6380",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={this.handleDelete}
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
