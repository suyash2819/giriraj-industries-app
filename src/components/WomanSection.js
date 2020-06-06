import React from "react";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import { data } from "./Data";
import Card from "./Card";

const CardList = () => {
  const women = data.collections.women;
  return (
    <div className="row">
      {women.map((women) => {
        return (
          <Card
            key={women.key}
            id={women.key}
            wrapperClass="col-md-3"
            image={women.image}
            itemType={women.itemType}
            description={women.Description}
            cost={women.Cost}
            btnText={women.btnText}
          />
        );
      })}
    </div>
  );
};

const Woman = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Lowers</h2>
        <CardList />
      </div>
    </>
  );
};

export default Woman;
