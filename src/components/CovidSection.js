import React from "react";
import Navbar from "./Header";
import { data } from "./Data";
import "../CSS/AllSection.css";

function CardDisplay() {
  const covid = data.collections.covid;
  return (
    <div className="row">
      {covid.map((covid, key) => {
        return (
          <div className="col-md-3" key={covid.key}>
            <div className="card">
              <img src={covid.image} alt="" />
              <div className="card-body">
                <h5 className="card-title">{covid.itemType}</h5>
                <p className="card-text">{covid.Description}</p>
                <p className="card-text">{covid.Cost}</p>
                <button className="btn btn-primary">{covid.btnText}</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Covid() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Masks</h2>
        <CardDisplay />
      </div>
    </>
  );
}

export default Covid;
