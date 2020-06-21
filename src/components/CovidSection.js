import React, { useState, useEffect } from "react";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import Card from "./Card";
import { db } from "../config/firebase";
import { LinearProgress } from "@material-ui/core";
import { sections } from "./data";

const CardList = () => {
  const [covid, setCovid] = useState([]);
  useEffect(() => {
    db.collection(sections.covid).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCovid(data);
    });
  }, []);

  if (covid.length === 0) {
    return <LinearProgress />;
  } else {
    return (
      <div className="row">
        {covid.map((covidData) => {
          return (
            <Card
              key={covidData.id}
              id={covidData.id}
              wrapperClass="col-md-3"
              image={covidData.Image_url}
              itemType={covidData.Item_Type}
              description={covidData.Description}
              cost={covidData.Cost}
              btnText="Add To Cart"
            />
          );
        })}
      </div>
    );
  }
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
