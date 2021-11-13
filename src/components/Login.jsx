import React, { Component } from "react";
import authService from "../services/auth-service";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
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
      // send the user to a private page
    });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div>
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

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
export default Login;
