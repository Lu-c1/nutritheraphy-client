import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import { BounceLoader } from "react-spinners";

class Private extends Component {
  state = {
    privateData: null,
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/private`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ privateData: response.data, isLoading: false });
      })
      .catch((err) => {
        //console.log(err.response.status)
        if (err.response.status === 403) {
          this.props.history.push("/login");
        }
      });
  }

  render() {
    const { privateData, isLoading } = this.state;
    {
      !this.props.loggedin && <Navigate to="/login" />;
    }

    return (
      <div>
        <p>Private Page</p>

        {isLoading && <BounceLoader size={90} />}
        {!isLoading && <p>{privateData.message}</p>}
      </div>
    );
  }
}
export default Private;
