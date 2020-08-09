import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = (props) => {
  const { success, message, alertDisplay } = props;
  return (
    <Alert
      variant={!!success ? "success" : "danger"}
      onClose={() => alertDisplay()}
      dismissible
    >
      {" "}
      {message || ""}
    </Alert>
  );
};

export default AlertMessage;
