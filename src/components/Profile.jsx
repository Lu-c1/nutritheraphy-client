import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Profile extends Component {
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label for="username">Username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />
          <br />

          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <br />

          <label for="mail">email</label>
          <input
            name="mail"
            type="text"
            value={mail}
            onChange={this.handleChange}
          />
          <br />

          <label for="name">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
          <br />

          <label for="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={lastName}
            onChange={this.handleChange}
          />
          <br />

          <label for="city">City</label>
          <input
            name="city"
            type="text"
            value={city}
            onChange={this.handleChange}
          />
          <br />

          <label for="country">Country</label>
          <input
            name="country"
            type="text"
            value={country}
            onChange={this.handleChange}
          />
          <br />

          <label for="typeOfDiet">What type of diet do you need?</label>
          <select name="typeOfDiet" onChange={this.handleChange}>
            <option value="vegetarian">Vegetarian</option>
            <option value="keto">Keto</option>
            <option value="glutenFree">Gluten Free</option>
            <option value="lowCalories">Low Calories</option>
          </select>
          <br />

          <button type="submit" onClick={this.handleToggle}>
            Edit
          </button>

          <button type="submit" onClick={this.handleToggle}>
            Delete
          </button>
        </form>
      </div>
    );
  }
}
export default Profile;
