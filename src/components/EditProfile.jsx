import React, { Component } from "react";
import axios from "axios";

class EditProfile extends Component {
  state = {
    username: "",
    // image: "",
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

  handleSubmit = () => {};

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/profile/${this.props.match.params.id}`
      )
      .then((response) => {
        const {
          username,
          password,
          mail,
          name,
          lastName,
          city,
          country,
          typeOfDiet,
        } = response.data;
        this.setState({
          username,
          password,
          mail,
          name,
          lastName,
          city,
          country,
          typeOfDiet,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {
      username,
      password,
      mail,
      name,
      lastName,
      city,
      country,
      typeOfDiet,
    } = this.state;
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
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />
          <br />
          {/* <img src={image} alt="image-recipe" /> */}

          <br />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="mail">Mail</label>
          <input
            name="mail"
            type="text"
            value={mail}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={lastName}
            onChange={this.handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            name="city"
            type="text"
            value={city}
            onChange={this.handleChange}
          />
          <label htmlFor="country">Country</label>
          <input
            name="country"
            type="text"
            value={country}
            onChange={this.handleChange}
          />

          <label htmlFor="typeOfDiet">Type Of Diet</label>
          <input
            name="typeOfDiet"
            type="text"
            value={typeOfDiet}
            onChange={this.handleChange}
          />
          <br />
          <button>Edit</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
