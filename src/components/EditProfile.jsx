import React, { Component } from "react";
import axios from "axios";

class EditProfile extends Component {
  state = {
    username: "",
    image: "",
    password: "",
    mail: "",
    name: "",
    lastName: "",
    city: "",
    country: "",
    typeOfDiet: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      image,
      password,
      email,
      name,
      lastName,
      city,
      country,
      typeOfDiet,
    } = this.state;
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/profile/${this.props.match.params.id}`,
        {
          username,
          image,
          password,
          email,
          name,
          lastName,
          city,
          country,
          typeOfDiet,
        },
        { withCredentials: true }
      )
      .then((result) => this.props.history.push(`/profile/${result.data._id}`));

    //.catch((err)=>this.props.history.push("/500"))
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/profile/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          image: response.data.image,
          email: response.data.email,
          name: response.data.name,
          lastName: response.data.lastName,
          city: response.data.city,
          country: response.data.country,
          typeOfDiet: response.data.typeOfDiet,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {
      username,
      image,
      password,
      email,
      name,
      lastName,
      city,
      country,
      typeOfDiet,
    } = this.state;
    return (
      <div
        style={{
          marginTop: "250px",
        }}
      >
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
          {image && <img src={image} alt="imageUser" />}
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
              <label htmlFor="email">Mail</label>
              <input
                style={{ margin: "10px" }}
                name="email"
                placeholder="email"
                type="text"
                value={email}
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
          <div className="row">
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
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProfile;
