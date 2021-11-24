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
        `${process.env.REACT_APP_SERVER_URL}/recipes/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ selectedRecipe: response.data, isLoading: false });
      })
      .catch((err) => this.props.history.push("/500"));
  }
  handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/recipes/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then(() => this.props.history.push("/recipes/list"))
      .catch(() => this.props.history.push("/500"));
  };
  render() {
    const { isLoading, selectedRecipe } = this.state;

    return (
      <div>
        {isLoading && <BounceLoader color={"#D7BDE2"} size={90} />}
        {!isLoading && (
          <div className="container-fluid m-5">
            <div
              className="card-deck d-sm-flex flex-column justify-content-center d-block m-auto mt-5"
              style={{
                height: "65rem",
                width: "90rem",
                backgroundColor: "#D9D5DB",
              }}
            >
              <img src="http://www.missmigas.com/wp-content/uploads/2014/10/IMG_34141.jpg" />
              {/* <img src={selectedRecipe.image} alt="recipeImage" /> */}

              <h1>{selectedRecipe.title}</h1>
              <div class="card-body">
                <h3>How To Cook It</h3>
                <div class="text-secondary text-justify ">
                  <h5>{selectedRecipe.howToCookIt}</h5>
                </div>
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RecipeDetails;
