import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

class RecipeDetails extends Component {
  state = {
    selectedRecipe: null,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/recipes/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ selectedRecipe: response.data, isLoading: false });
      })
      .catch((err) => this.props.history.push("/500"));
  }
  handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_API}/recipes/${this.props.match.params.id}`
      )
      .then(() => this.props.history.push("/"))
      .catch(() => this.props.history.push("/500"));
  };
  render() {
    const { isLoading, selectedRecipe } = this.state;

    return (
      <div>
        {isLoading && <BounceLoader size={90} />}
        {!isLoading && (
          <div>
            <h1>{selectedRecipe.title}</h1>
            <img src={selectedRecipe.image} alt="recipeImage" />
            <h1>{selectedRecipe.howToCookIt}</h1>
            <Link to={`/recipes/${selectedRecipe._id}/edit`}>
              <button
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
                Edit
              </button>
            </Link>

            <button
              onClick={this.handleDelete}
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
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default RecipeDetails;
