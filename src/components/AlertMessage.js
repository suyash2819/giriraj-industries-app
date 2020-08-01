import React from "react";

const AlertMessage = (props) => {
  const { success, message } = props;

  if (success === true) {
    return (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  } else {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        {message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
};

export default AlertMessage;
