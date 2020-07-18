import React, { useState, useEffect } from "react";
import Navbar from "./Header";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";
import { sections } from "./data";
import ContainerCard from "./ContainerCard";

const ManCardList = () => {
  const [men, setMen] = useState([]);
  useEffect(() => {
    db.collection(sections.men).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMen(data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <ContainerCard data={men} btnText="Add To Cart"></ContainerCard>
    </>
  );
};

export default ManCardList;
