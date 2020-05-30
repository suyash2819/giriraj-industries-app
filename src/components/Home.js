import React from "react";
import "../CSS/Home.css";
import Navbar from "./Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <div className="Woman-pic">
        <h1 className="front-text">WOMEN</h1>
        <button className="front-button">
          <Link to="/Woman">DISCOVER</Link>
        </button>
      </div>
      <div className="Man-pic">
        <h1 className="front-text">MEN</h1>
        <button className="front-button">
          <Link to="/Man">DISCOVER</Link>
        </button>
      </div>
      <div className="Kid-pic">
        <h1 className="front-text">KIDS</h1>
        <button className="front-button">
          <Link to="/Kids">DISCOVER</Link>
        </button>
      </div>
      <div className="Covid-pic">
        <h1 className="front-text">COVID</h1>
        <button className="front-button">
          <Link to="/Covid">DISCOVER</Link>
        </button>
      </div>
    </>
  );
}
export default Home;
