import React from "react";
import Navbar from "./Header";
import { data } from "./Data";
import Card from "./Card";

const CardList = () => {
  const men = data.collections.men;
  return (
    <div className="row">
      {men.map((men) => {
        return (
          <Card
            key={men.key}
            id={men.key}
            wrapperClass="col-md-3"
            image={men.image}
            itemType={men.itemType}
            description={men.Description}
            cost={men.Cost}
            btnText={men.btnText}
          />
        );
      })}
    </div>
  );
};

const Man = () => {
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

export default Man;
