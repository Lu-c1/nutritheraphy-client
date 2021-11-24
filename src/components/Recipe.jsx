import React, { Component } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";

class Recipe extends Component {
  state = {
    title: "",
    image: "",
    createdBy: "",
    portions: "",
    howToCookIt: "",
    typeOfDiet: "",
    imageIsLoading: false,
  };
  handleImageUpload = (event) => {
    //console.log(event.target.files[0]);

    this.setState({ imageIsLoading: true });
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    //console.log(uploadData);
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { createdBy, title, image, portions, typeOfDiet, howToCookIt } =
      this.state;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/recipes/create`,
        {
          createdBy,
          title,
          image,
          portions,
          howToCookIt,
          typeOfDiet,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => this.props.history.push("/recipes/list"))
      .catch((err) => this.props.history.push("/500"));
  };

  render() {
    const { title, image, portions, howToCookIt, typeOfDiet, imageIsLoading } =
      this.state;

    return (
      <div
        className="d-sm-flex flex-direction-column align-items-start text-align-start justify-content-center mt-5"
        style={{
          height: "900px",
          backgroundColor: "#D9D5DB",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="form-group mt-5">
              {/* /* {image && (
              <img src={image} className="card-img-top" alt="recipeImage" />
            )}*/}
              <BounceLoader
                color={"#D7BDE2"}
                loading={imageIsLoading}
                size={90}
              />
              <input
                onChange={this.handleImageUpload}
                type="file"
                name="image"
                value={image}
              />
            </div>
            <br />
            <div className="form-group m-5">
              <label htmlFor="title" style={{ width: "100px" }}>
                Title
              </label>
              <input
                name="title"
                type="text"
                value={title}
                onChange={this.handleChange}
              />
              <br />
            </div>
            <div className="form-group m-5">
              <label htmlFor="portions" style={{ width: "100px" }}>
                Portions
              </label>
              <input
                name="portions"
                type="text"
                value={portions}
                onChange={this.handleChange}
              />
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="howToCookIt" style={{ width: "120px" }}>
                How To Cook It
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="7"
                name="howToCookIt"
                value={howToCookIt}
                onChange={this.handleChange}
              />
              <br />
            </div>
            <div className="form-group w-100">
              <label htmlFor="typeOfDiet">Type of Diet </label>

              <select
                class="form-control mb-5"
                id="exampleFormControlSelect1"
                style={{ height: "35px", width: "160px", margin: "10px" }}
                name="typeOfDiet"
                onChange={this.handleChange}
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="keto">Keto</option>
                <option value="glutenFree">Gluten Free</option>
                <option value="lowCalories">Low Calories</option>
                <option value="rawFood">Raw Food</option>
              </select>

              {/* <p>{typeOfDiet}</p> */}
            </div>

            <button
              type="submit"
              // disabled={imageIsLoading}
              style={{
                padding: "10px",
                margin: "auto",

                width: "100px",
                backgroundColor: "#4E6380",
                color: "white",
                fontWeight: "600",
              }}
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Recipe;
