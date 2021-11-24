import React from "react";

function ServerError({ history }) {
  return (
    <div>
      <h1> Sorry, something went wrong</h1>
      <button
        className="btn btn-secondary:hover"
        style={{
          padding: "10px",
          margin: "10px",
          width: "100px",
          backgroundColor: "#4E6380",
          color: "white",
          fontWeight: "600",
        }}
        onClick={() => history.goBack()}
      >
        Return
      </button>
    </div>
  );
}
export default ServerError;
