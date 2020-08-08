import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = (props) => {
  const { success, message, alertDisplay } = props;

  if (success === true) {
    return (
      <Alert variant="success" onClose={() => alertDisplay()} dismissible>
        {message || ""}
      </Alert>
    );
  } else {
    return (
      <Alert variant="danger" onClose={() => alertDisplay()} dismissible>
        {message || ""}
      </Alert>
    );
  }
};

export default AlertMessage;
