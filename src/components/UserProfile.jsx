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
        `${process.env.REACT_APP_SERVER_API}/profile/${this.props.match.params.id}`
      )
      .then(() => this.props.history.push("/"))
      .catch(() => this.props.history.push("/500"));
  };
  render() {
    const { yourProfile, isLoading } = this.state;
    return (
      <div
        className="container emp-profile"
        style={{
          marginTop: "100px",
          display: "flex",
          contentAlign: "center",
        }}
      >
        {isLoading && <BounceLoader size={90} />}
        {!isLoading && (
          <div>
            <h2> Your Profile </h2>

            <form
              method="post"
              style={{
                height: "900px",
                width: "900px",
                fontSize: "20px",
                marginTop: "200px",
              }}
            >
              <div className="row">
                <div className="col-md-16">
                  <div className="profile-img">
                    <img src={yourProfile.image} alt="" />

                    <div
                      className="file btn btn-lg btn-primary"
                      style={{
                        padding: "10px",
                        marginBottom: "40px",
                        width: "100px",
                        backgroundColor: "#4E6380",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Add Photo
                      {/* <input type="file" name="file" /> */}
                    </div>
                  </div>
                </div>

                <div className="col-md-2">
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

                <div className="col-md-8">
                  <div
                    style={{ margin: "10px" }}
                    className="tab-content profile-tab"
                    id="myTabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>Username: </label>
                        </div>
                        <div className="col-md-6">
                          <p>{yourProfile.username}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Name: </label>
                        </div>
                        <div className="col-md-6">
                          <p>{yourProfile.name}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Last Name: </label>
                        </div>
                        <div className="col-md-6">
                          <p>{yourProfile.lastName}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>City: </label>
                        </div>
                        <div className="col-md-6">
                          <p>{yourProfile.city}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Country: </label>
                        </div>
                        <div className="col-md-6">
                          <p>{yourProfile.country}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Type of Diet: </label>
                          <p>{yourProfile.typeOfDiet}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
