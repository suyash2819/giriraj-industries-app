import React from "react";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import { data } from "./Data";

function CardDisplay() {
  const women = data.collections.women;
  return (
    <div className="row">
      {women.map((women, key) => {
        return (
          <div className="col-md-3" key={women.key}>
            <div className="card">
              <img src={women.image} alt="" />
              <div className="card-body">
                <h5 className="card-title">{women.itemType}</h5>
                <p className="card-text">{women.Description}</p>
                <p className="card-text">{women.Cost}</p>
                <button className="btn btn-primary">{women.btnText}</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Woman() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Lowers</h2>
        <CardDisplay />
      </div>
    </>
  );
}

export default Woman;
