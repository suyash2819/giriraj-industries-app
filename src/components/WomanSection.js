import React, { useState, useEffect } from "react";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import Card from "./Card";
import { db } from "../config/firebase";
import { LinearProgress } from "@material-ui/core";

const CardList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [women, setWomen] = useState([]);
  useEffect(() => {
    let WomenCollection = db.collection("Women");
    WomenCollection.get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setIsLoaded(true);
        setWomen(data);
      })
      .catch((err) => {
        setIsLoaded(true);
        console.log(err);
      });
  }, []);

  if (!isLoaded) {
    return <LinearProgress />;
  } else {
    return (
      <div className="row">
        {women.map((womenData, index) => {
          return (
            <Card
              key={index}
              id={index}
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
