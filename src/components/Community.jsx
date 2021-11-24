import axios from "axios";
import React, { Component } from "react";
import authService from "../services/auth-service";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

class Community extends Component {
  state = {
    listOfUsernames: null,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile/list`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ listOfUsernames: response.data, isLoading: false });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.isLoading && (
          <BounceLoader
            display={"block"}
            margin={"auto"}
            color={"#D7BDE2"}
            size={90}
          />
        )}
        <div className="card-deck d-sm-flex flex-row flex-wrap justify-content-center w-18rem">
          {!this.state.isLoading &&
            this.state.listOfUsernames.map((eachUser) => {
              return (
                <div
                  key={eachUser.id}
                  className="card m-5 d-sm-flex flex-wrap-row"
                >
                  <img
                    className="card-img-top"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxNbV-Jx4qPKQR3db2ue8zoHj5M94dEtMCg&usqp=CAU"
                  />

                  {eachUser.image && (
                    <img src={eachUser.image} alt="userImageProfile" />
                  )}
                  <div class="card-body">
                    <p class="card-text">
                      <Link exact to={`/profile/${eachUser._id}`}>
                        {eachUser.username}
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default Community;
