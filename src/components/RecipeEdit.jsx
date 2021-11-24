import React, { Component } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";

class RecipeEdit extends Component {
  state = {
    title: "",
    image: "",
    portions: "",
    howToCookIt: "",
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
    const { title, image, portions, howToCookIt } = this.state;
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/recipes/${this.props.match.params.id}`,
        { title, image, portions, howToCookIt },
        { withCredentials: true }
      )
      .then((result) => this.props.history.push(`/recipes/${result.data._id}`));

    // .catch((err)=>this.props.history.push("/500"))
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/recipes/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data.image);
        this.setState({
          title: response.data.title,
          image: response.data.image,

          portions: response.data.portions,
          howToCookIt: response.data.howToCookIt,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { title, image, portions, howToCookIt, imageIsLoading } = this.state;
    return (
      <div
        className="container-fluid d-block m-auto d-sm-flex flex-direction-column align-items-start text-align-start justify-content-center mt-5"
        style={{
          marginTop: "100px",
          backgroundColor: "#D9D5DB",
          width: "100%",
        }}
      >
        <div className="card">
          <form
            onSubmit={this.handleSubmit}
            style={{ backgroundColor: "#D9D5DB", width: "100%" }}
          >
            <div className="form-group m-5">
              <BounceLoader
                color={"#D7BDE2"}
                loading={imageIsLoading}
                size={90}
              />
              <input
                onChange={this.handleImageUpload}
                type="file"
                name="image"
              />
            </div>

            <br />
            <div
              className="form-group m-5"
              style={{
                marginTop: "10rem",
                flexDirection: "column",
                display: "flex",
                flex: "auto",
                alignContent: "center",
                gap: "10px",
              }}
            >
              <label htmlFor="title" style={{ width: "100px" }}>
                Title
              </label>
              <input
                style={{ width: "400px" }}
                name="title"
                type="text"
                value={title}
                onChange={this.handleChange}
              />
              <br />
              <div className="form-group m-5 d-sm-flex text-align-start">
                <label htmlFor="portions" style={{ width: "100px" }}>
                  Portions
                </label>
                <input
                  style={{ width: "80px" }}
                  name="portions"
                  type="text"
                  value={portions}
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <div className="form-group m-5 w-100 m-auto">
                <label htmlFor="howToCookIt">How To Cook It</label>
                <textarea
                  name="howToCookIt"
                  className="form-control "
                  id="exampleFormControlTextarea1"
                  rows="7"
                  value={howToCookIt}
                  onChange={this.handleChange}
                />
                <br />
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default RecipeEdit;
