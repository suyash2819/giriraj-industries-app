import React from "react";
import Navbar from "./Header";
import { data } from "./Data";
import "../CSS/AllSection.css";
import Card from "./Card";

const CardList = () => {
  const covid = data.collections.covid;
  return (
    <div className="row">
      {covid.map((covid) => {
        return (
          <Card
            key={covid.key}
            id={covid.key}
            wrapperClass="col-md-3"
            image={covid.image}
            itemType={covid.itemType}
            description={covid.Description}
            cost={covid.Cost}
            btnText={covid.btnText}
          />
        );
      })}
    </div>
  );
};

const Covid = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Masks</h2>
        <CardList />
      </div>
    </>
  );
};

export default Covid;
