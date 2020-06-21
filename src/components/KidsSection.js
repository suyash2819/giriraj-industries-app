import React, { useState, useEffect } from "react";
import Card from "./Card";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import { db } from "../config/firebase";
import { LinearProgress } from "@material-ui/core";
import { sections } from "./data";

const CardList = () => {
  const [kids, setKids] = useState([]);
  useEffect(() => {
    db.collection(sections.kids).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKids(data);
    });
  }, []);

  if (kids.length === 0) {
    return <LinearProgress />;
  } else {
    return (
      <div className="row">
        {kids.map((kidsData) => {
          return (
            <Card
              key={kidsData.id}
              id={kidsData.id}
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
