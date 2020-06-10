import React, { useState, useEffect } from "react";
import Navbar from "./Header";
// import { data } from "./Data";
import "../CSS/AllSection.css";
import Card from "./Card";
import { db } from "../config/firebase";
import { LinearProgress } from "@material-ui/core";

const CardList = () => {
  // const covid = data.collections.covid;
  const [isLoaded, setIsLoaded] = useState(false);
  const [covid, setCovid] = useState([]);
  useEffect(() => {
    let CovidCollection = db.collection("Covid");
    CovidCollection.get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setIsLoaded(true);
        setCovid(data);
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
        {covid.map((covidData, index) => {
          return (
            <Card
              key={index}
              id={index}
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
