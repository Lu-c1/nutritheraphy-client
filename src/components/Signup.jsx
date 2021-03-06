import React, { Component } from "react";
import authService from "../services/auth-service";
import { BounceLoader } from "react-spinners";
import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    image: "",
    email: "",
    name: "",
    lastName: "",
    city: "",
    country: "",
    typeOfDiet: "",
    imageIsLoading: false,

    showForm: true,
  };

  handleToggle = () => {
    this.setState({ showForm: false });
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      password,
      image,
      email,
      name,
      lastName,
      city,
      country,
      typeOfDiet,
    } = this.state;
    authService
      .signup(
        username,
        password,
        image,
        email,
        name,
        lastName,
        city,
        country,
        typeOfDiet
      )
      .then((result) => {
        // this.setState({
        //   username: "",
        //   password: "",
        //   email: "",
        //   name: "",
        //   lastName: "",
        //   city: "",
        //   country: "",
        //   typeOfDiet: "",
        // });
        this.props.setUser(result.data, true);
        this.props.history.push(`/profile/${result.data._id}`);
      });
  };

  render() {
    const {
      username,
      password,
      image,
      mail,
      name,
      lastName,
      city,
      country,
      typeOfDiet,
      imageIsLoading,
    } = this.state;
    return (
      <div
        style={{
          marginTop: "250px",
        }}
      >
        <h2>Create a new account</h2>
        <form
          style={{
            marginTop: "100px",
            fontSize: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={this.handleSubmit}
        >
          <BounceLoader color={"#D7BDE2"} loading={imageIsLoading} size={150} />
          <input
            onChange={this.handleImageUpload}
            style={{ margin: "60px" }}
            type="file"
            name="image"
            value={image}
          />
          <br />

          <div className="row">
            <div className="col">
              <label htmlFor="username">Username</label>
              <input
                style={{ margin: "10px" }}
                name="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <br />

            <div className="col">
              <label htmlFor="password">Password </label>
              <input
                style={{ margin: "10px" }}
                name="password"
                placeholder="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="mail">Mail</label>
              <input
                style={{ margin: "10px" }}
                name="mail"
                placeholder="mail"
                type="text"
                value={mail}
                onChange={this.handleChange}
              />
            </div>

            <br />
            <div className="col">
              <label htmlFor="name">Name</label>
              <input
                style={{ margin: "10px" }}
                name="name"
                placeholder="name"
                type="text"
                value={name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="lastName">Last Name</label>
              <input
                style={{ margin: "10px" }}
                name="lastName"
                placeholder="last name"
                type="text"
                value={lastName}
                onChange={this.handleChange}
              />
            </div>
            <br />

            <div className="col">
              <label htmlFor="city">City</label>
              <input
                style={{ margin: "10px" }}
                name="city"
                placeholder="city"
                type="text"
                value={city}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="country">Country</label>
              <input
                style={{ margin: "10px" }}
                name="country"
                placeholder="country"
                type="text"
                value={country}
                onChange={this.handleChange}
              />
            </div>
            <br />

            <div className="col">
              <label htmlFor="typeOfDiet">Type of diet</label>
              <select
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
            </div>

            <br />
          </div>
          <div style={{ marginTop: "100px" }} className="col">
            <button
              style={{
                padding: "10px",
                margin: "10px",
                width: "100px",
                backgroundColor: "#4E6380",
                color: "white",
                fontWeight: "600",
              }}
              type="submit"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Signup;
