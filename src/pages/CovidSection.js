import React, { useState, useEffect } from "react";
import NavBar from "../components/Header";
import { db } from "../config/firebase";
import { sections } from "../data";
import ContainerCard from "../components/ContainerCard";
import "../CSS/AllSection.css";

const CovidCardList = () => {
  const [covid, setCovid] = useState([]);
  useEffect(() => {
    db.collection(sections.covid).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        item_num: 0,
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
