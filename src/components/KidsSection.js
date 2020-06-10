import React, { useState, useEffect } from "react";
import Card from "./Card";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import { db } from "../config/firebase";
import { LinearProgress } from "@material-ui/core";

const CardList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [kids, setKids] = useState([]);
  useEffect(() => {
    let KidsCollection = db.collection("Kids");
    KidsCollection.get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setIsLoaded(true);
        setKids(data);
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
        {kids.map((kidsData, index) => {
          return (
            <Card
              key={index}
              id={index}
              wrapperClass="col-md-3"
              image={kidsData.Image_url}
              itemType={kidsData.Item_Type}
              description={kidsData.Description}
              cost={kidsData.Cost}
              btnText="Add To Cart"
            />
          );
        })}
      </div>
    );
  }
};

const Kids = () => {
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

export default Kids;
