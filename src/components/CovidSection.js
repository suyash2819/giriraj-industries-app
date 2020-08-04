import React, { useState, useEffect } from "react";
import NavBar from "./Header";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";
import { sections } from "./data";
import ContainerCard from "./ContainerCard";

const CovidCardList = () => {
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
  return (
    <>
      <NavBar />
      <ContainerCard data={covid} btnText="Add To Cart"></ContainerCard>
    </>
  );
};

export default CovidCardList;
