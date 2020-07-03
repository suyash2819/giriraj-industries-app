import React, { useState, useEffect } from "react";
import Navbar from "./Header";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";
import { sections } from "./data";
import ContainerCard from "./ContainerCard";

const Covid = () => {
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
      <Navbar />
      <ContainerCard data={covid}></ContainerCard>
    </>
  );
};

export default Covid;
