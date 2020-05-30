import React from "react";
import Navbar from "./Header";
import { data } from "./Data";

function CardDisplay() {
  const kids = data.collections.kids;
  return (
    <div className="row">
      {kids.map((kids, key) => {
        return (
          <div className="col-md-3" key={kids.key}>
            <div className="card">
              <img src={kids.image} alt="" />
              <div className="card-body">
                <h5 className="card-title">{kids.itemType}</h5>
                <p className="card-text">{kids.Description}</p>
                <p className="card-text">{kids.Cost}</p>
                <button className="btn btn-primary">{kids.btnText}</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Kids() {
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

export default Kids;
