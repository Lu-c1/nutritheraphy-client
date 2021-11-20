import React, { Component } from "react";
import axios from "axios";

class RecipeEdit extends Component {
  state = {
    title: "",
    image: "",
    createdBy: "",
    portions: "",
    howToCookIt: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {};

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/recipes/${this.props.match.params.id}}`
      )
      .then((response) => {
        const { title, image, createdBy, portions, howToCookIt } =
          response.data;
        this.setState({
          title,
          image,
          createdBy,
          portions,
          howToCookIt,
          /*   title: response.data.title,
          image: response.data.image,
          createdBy: response.data.createdBy,
          portions: response.data.portions,
          howToCookIt: response.data.howToCookIt, */
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { title, image, portions, howToCookIt } = this.state;
    return (
      <div
        className="container emp-profile"
        style={{
          marginTop: "100px",
          display: "flex",
          contentAlign: "center",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={this.handleChange}
          />
          <br />
          <img src={image} alt="image-recipe" />

          <br />

          <label htmlFor="portions">Portions</label>
          <input
            name="portions"
            type="text"
            value={portions}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="howToCookIt">How To Cook It</label>
          <input
            name="howToCookIt"
            type="text"
            value={howToCookIt}
            onChange={this.handleChange}
          />
          <br />
          <button>Edit</button>
        </form>
      </div>
    );
  }
}

export default RecipeEdit;
