import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import authService from "./services/auth-service";
import Login from "./components/Login";
import Private from "./components/Private";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";

/* import HomePage from "./pages/HomePage";
import * as PATHS from "./utils/paths"; */

class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
  };
  setUser = (user, loggedInStatus) => {
    this.setState({
      user,
      isLoggedIn: loggedInStatus,
    });
  };
  getUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((response) => {
          this.setState({
            user: response.data.user,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getUser();
  }
  render() {
    const { user, isLoggedIn } = this.state;
    return (
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} user={user} setUser={this.setUser} />
        <Switch>
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />

          <Route
            exact
            path="/private"
            render={(props) => <Private {...props} />}
          />

          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} />}
          />

          <Route
            exact
            path="/recipes"
            render={(props) => <Recipe {...props} />}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
