import React, { useState, useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import Navbar from "./Header";
import { db } from "../config/firebase";
import Card from "./Card";
import "../CSS/AllSection.css";

const CardList = () => {
  const [men, setMen] = useState([]);
  useEffect(() => {
    db.collection("Men").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMen(data);
    });
  }, []);

  if (men.length === 0) {
    return <LinearProgress />;
  } else {
    return (
      <div className="row">
        {men.map((menData) => {
          return (
            <Card
              key={menData.id}
              id={menData.id}
              wrapperClass="col-md-3"
              image={menData.Image_url}
              itemType={menData.Item_Type}
              description={menData.Description}
              cost={menData.Cost}
              btnText="Add To Cart"
            />
          );
        })}
      </div>
    );
  }
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
