import React from "react";
import { Spinner } from "react-bootstrap";
import "../CSS/loader.css";

const Loader = () => {
  return (
    <div className="loaderDisplay">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
