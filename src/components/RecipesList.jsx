import axios from "axios";
import React, { Component } from "react";
// import recipeService from "../services/recipe-service";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import SearchBar from "./SearchBar";

class RecipesList extends Component {
  state = {
    recipesList: null,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/recipes/list`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ recipesList: response.data, isLoading: false });
      })
      .catch((err) => console.log(err));
    //recipeService.list.then((response) => console.log(response));//why is not working??
  }
  render() {
    return (
      <div>
        <SearchBar />

        {this.state.isLoading && <BounceLoader color={"#D7BDE2"} size={90} />}
        <div className="card-deck d-sm-flex flex-row flex-wrap justify-content-center">
          {!this.state.isLoading &&
            this.state.recipesList.map((eachRecipe) => {
              return (
                <div
                  key={eachRecipe.id}
                  className="card m-5 d-sm-flex flex-wrap-row"
                >
                  <div style={{ fontSize: "1.3rem" }}>
                    <img src="http://www.missmigas.com/wp-content/uploads/2014/10/IMG_34141.jpg" />
                    <div>
                      <Link exact to={`/recipes/${eachRecipe._id}`}>
                        {eachRecipe.title}
                      </Link>
                      <br />
                      Created by:
                      {eachRecipe.createdBy && (
                        <Link exact to={`/profile/list`}>
                          {eachRecipe.createdBy.username}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default RecipesList;
