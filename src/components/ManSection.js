import React, { useState, useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import Navbar from "./Header";
import { db } from "../config/firebase";
import Card from "./Card";
import "../CSS/AllSection.css";

const CardList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [men, setMen] = useState([]);
  useEffect(() => {
    const MenCollection = db.collection("Men");
    MenCollection.get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setIsLoaded(true);
        setMen(data);
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
        {men.map((menData, index) => {
          return (
            <Card
              key={index}
              id={menData.key}
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
