import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Header";
import "../CSS/Home.css";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="Woman-pic">
        <h1 className="front-text">WOMEN</h1>
        <button className="front-button">
          <Link to="/woman">DISCOVER</Link>
        </button>
      </div>
      <div className="Man-pic">
        <h1 className="front-text">MEN</h1>
        <button className="front-button">
          <Link to="/man">DISCOVER</Link>
        </button>
      </div>
      <div className="Kid-pic">
        <h1 className="front-text">KIDS</h1>
        <button className="front-button">
          <Link to="/kids">DISCOVER</Link>
        </button>
      </div>
      <div className="Covid-pic">
        <h1 className="front-text">COVID</h1>
        <button className="front-button">
          <Link to="/covid">DISCOVER</Link>
        </button>
      </div>
    </>
  );
};
export default Home;
