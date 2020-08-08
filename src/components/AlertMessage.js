import { React, useState } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = (props) => {
  //   const alertFunc = () => {
  const { success, message } = props;
  const [showAlert, setshowAlert] = useState(false);

  const alertDisplay = () => {
    setshowAlert(false);
  };

  if (success === true) {
    setshowAlert(true);

    return showAlert ? (
      <Alert variant="success" onClose={() => alertDisplay()} dismissible>
        {message || ""}
      </Alert>
    ) : null;
  } else {
    setshowAlert(true);

    return showAlert ? (
      <Alert variant="danger" onClose={() => alertDisplay()} dismissible>
        {message || ""}
      </Alert>
    ) : null;
  }
};
// };

const CallFunc = () => {
  const func = (success, message) => {
    // return <AlertMessage success={success} message={message} />;
    console.log("called");
    return "suyash";
  };
};

export default CallFunc;
