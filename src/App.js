import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import authService from "./services/auth-service";
import Login from "./components/Login";
import ServerError from "./components/ServerError";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";
import Recipe from "./components/Recipe";
import RecipesList from "./components/RecipesList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeEdit from "./components/RecipeEdit";
import Community from "./components/Community";
import HomePage from "./components/HomePage";
import SearchBar from "./components/SearchBar";

/* import HomePage from "./pages/HomePage";
import * as PATHS from "./utils/paths"; */

class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
  };
  // create method that sets null isLoggedIn and user, pass the method to UserProfile
  // or
  // use the setUser function inside UserProfile but pass two null arguments
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
          <Route path="/" exact render={(props) => <HomePage {...props} />} />
          <Route
            path="/signup"
            exact
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            path="/login"
            exact
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />
          <Route
            path="/profile/list"
            exact
            render={(props) => <Community {...props} />}
          />

          <Route
            path="/profile/:id"
            exact
            render={(props) => <UserProfile {...props} />}
          />

          <Route
            path="/profile/:id/edit"
            exact
            render={(props) => <EditProfile {...props} />}
          />

          <Route
            path="/recipes/list"
            exact
            render={(props) => <RecipesList {...props} />}
          />

          <Route
            path="/recipes/create"
            exact
            render={(props) => <Recipe {...props} />}
          />
          <Route
            path="/recipes/:id"
            exact
            render={(props) => <RecipeDetails {...props} />}
          />
          <Route
            path="/recipes/:id/edit"
            exact
            render={(props) => <RecipeEdit {...props} />}
          />
          <Route path="/500" component={ServerError} />

          {/*    <Route
            component={NotFound} />
          />       */}
        </Switch>
      </div>
    );
  }
}
export default App;
