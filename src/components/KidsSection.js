import React, { useState, useEffect } from "react";
import Navbar from "./Header";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";
import { sections } from "./data";
import ContainerCard from "./ContainerCard";

const KidsCardList = () => {
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
  return (
    <>
      <Navbar />
      <ContainerCard data={kids}></ContainerCard>
    </>
  );
};

export default KidsCardList;
