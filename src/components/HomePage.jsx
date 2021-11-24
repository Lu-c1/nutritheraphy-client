import React, { Component } from "react";
import logo from "../assets/LogoNutritherapy.png";

export default class HomePage extends Component {
  render() {
    return (
      <div style={{ display: "block", margin: "auto" }}>
        <img
          className="logo"
          src={logo}
          style={{
            height: "11vmin",
            marginTop: "20px",
            marginLeft: "40px",
            width: "500px",
          }}
        />
      </div>
    );
  }
}
