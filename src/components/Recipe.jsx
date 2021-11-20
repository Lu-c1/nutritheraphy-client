import React, { Component, useReducer } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";

class Recipe extends Component {
  state = {
    title: "",
    image: "",
    createdBy: "",
    portions: "",
    howToCookIt: "",
    imageIsLoading: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { createdBy, title, image, portions, howToCookIt } = this.state;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/recipes/create`,
        {
          createdBy,
          title,
          image,
          portions,
          howToCookIt,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => this.props.history.push("/"))
      .catch((err) => this.props.history.push("/500"));
  };

  handleImageUpload = (event) => {
    console.log(event.target.files[0]);

    this.setState({ imageIsLoading: true });
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    console.log(uploadData);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        { uploadData },
        { withCredentials: true }
      )
      .then((result) =>
        this.setState({ image: result.data.imagePath, imageIsLoading: false })
      )
      .catch((err) => this.props.history.push("/500"));
  };

  render() {
    const { title, image, portions, howToCookIt, imageIsLoading } = this.state;

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
          {image && <img src={image} alt="recipeImage" />}
          <BounceLoader loading={imageIsLoading} size={90} />
          <input onChange={this.handleImageUpload} type="file" name="image" />
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
          <button type="submit" disabled={imageIsLoading}>
            Create Recipe
          </button>
        </form>
      </div>
    );
  }
}
export default Recipe;
