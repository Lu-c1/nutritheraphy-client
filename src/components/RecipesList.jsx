import axios from "axios";
import React, { Component } from "react";
// import recipeService from "../services/recipe-service";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

class RecipesList extends Component {
  state = {
    recipesList: null,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/recipes/list`)
      .then((response) => {
        this.setState({ recipesList: response.data, isLoading: false });
      })
      .catch((err) => console.log(err));
    //recipeService.list.then((response) => console.log(response));//why is not working??
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Recipes List</a>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search Recipe
              </button>
            </form>
          </div>
        </nav>

        {this.state.isLoading && <BounceLoader size={90} />}
        {!this.state.isLoading &&
          this.state.recipesList.map((eachRecipe) => {
            return (
              <div key={eachRecipe.id}>
                <p>
                  <Link exact to={`/recipes/${eachRecipe._id}/details`}>
                    {eachRecipe.title}
                  </Link>{" "}
                  : (created by:{" "}
                  {eachRecipe.createdBy && eachRecipe.createdBy.username})
                </p>
              </div>
            );
          })}
      </div>
    );
  }
}
export default RecipesList;
