import React, { useState, useEffect } from "react";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import Card from "./Card";
import { db } from "../config/firebase";
import { LinearProgress } from "@material-ui/core";

const CardList = () => {
  const [women, setWomen] = useState([]);
  useEffect(() => {
    db.collection("Women").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWomen(data);
    });
  }, []);

  if (women.length === 0) {
    return <LinearProgress />;
  } else {
    return (
      <div className="row">
        {women.map((womenData) => {
          return (
            <Card
              key={womenData.id}
              id={womenData.id}
              wrapperClass="col-md-3"
              image={womenData.Image_url}
              itemType={womenData.Item_Type}
              description={womenData.Description}
              cost={womenData.Cost}
              btnText="Add To Cart"
            />
          );
        })}
      </div>
    );
  }
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
