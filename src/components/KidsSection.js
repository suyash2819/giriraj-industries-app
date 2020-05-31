import React from "react";
import Card from "./Card";
import Navbar from "./Header";
import { data } from "./Data";

const CardDisplay = () => {
  const kids = data.collections.kids;
  return (
    <div className="row">
      {kids.map((kids) => {
        return (
          <Card
            key={kids.key}
            id={kids.key}
            wrapperClass="col-md-3"
            image={kids.image}
            itemType={kids.itemType}
            description={kids.Description}
            cost={kids.Cost}
            btnText={kids.btnText}
          />
        );
      })}
    </div>
  );
};

const Kids = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Lowers</h2>
        <CardDisplay />
      </div>
    </>
  );
};

export default Kids;
