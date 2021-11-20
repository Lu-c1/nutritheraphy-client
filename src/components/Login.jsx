import React, { Component } from "react";
import authService from "../services/auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  /*  handleToggle = () => {
    this.setState({ showForm: false });
  }; */

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    authService.login(username, password).then((result) => {
      this.setState({ username: "", password: "" });
      this.props.setUser(result.data, true);
      this.props.history.push(`/profile/${result.data._id}`);

      // send the user to a private page
    });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div style={{ marginTop: "100px" }}>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />

          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />

          <button
            type="submit"
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
        </form>
      </div>
    );
  }
}
export default Login;
