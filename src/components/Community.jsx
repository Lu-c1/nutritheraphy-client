import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

class Community extends Component {
  state = {
    listOfUsernames: null,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile/list`)
      .then((response) => {
        this.setState({ listOfUsernames: response.data, isLoading: false });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.isLoading && <BounceLoader size={90} />}
        {!this.state.isLoading &&
          this.state.recipesList.map((eachUsername) => {
            return (
              <div key={eachUsername.id}>
                <p>
                  <Link exact to={`/profile/${eachUsername._id}`}>
                    {eachUsername.username}
                  </Link>
                </p>
              </div>
            );
          })}
      </div>
    );
  }
}
export default Community;
