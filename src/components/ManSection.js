import React from "react";
import Navbar from "./Header";
import { data } from "./Data";

function CardDisplay() {
  const men = data.collections.men;
  return (
    <div className="row">
      {men.map((men, key) => {
        return (
          <div className="col-md-3" key={men.key}>
            <div className="card">
              <img src={men.image} alt="" />
              <div className="card-body">
                <h5 className="card-title">{men.itemType}</h5>
                <p className="card-text">{men.Description}</p>
                <p className="card-text">{men.Cost}</p>
                <button className="btn btn-primary">{men.btnText}</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Man() {
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

export default Man;
