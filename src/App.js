import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import authService from "./services/auth-service";
import Login from "./components/Login";
import Private from "./components/Private";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";
import Recipe from "./components/Recipe";
import RecipesList from "./components/RecipesList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeEdit from "./components/RecipeEdit";
import Community from "./components/Community";

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
            path="/private"
            exact
            render={(props) => <Private {...props} />}
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
            path="/profile/list"
            exact
            render={(props) => <Community {...props} />}
          />

          <Route
            path="/recipes/list"
            exact
            render={(props) => <RecipesList {...props} />}
          />

          <Route
            path="/recipes/:id/details"
            exact
            render={(props) => <RecipeDetails {...props} />}
          />

          <Route
            path="/recipes/create"
            exact
            render={(props) => <Recipe {...props} />}
          />
          <Route
            path="/recipes/:id/edit"
            exact
            render={(props) => <RecipeEdit {...props} />}
          />
          {/*   <Route
            path="/500"
            component={ServerError} />
          />

          <Route
            component={NotFound} />
          />       */}
        </Switch>
      </div>
    );
  }
}
export default App;
