import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Recipes List</a>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search Recipe
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}
export default SearchBar;
