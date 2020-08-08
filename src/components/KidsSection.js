import React, { useState, useEffect } from "react";
import NavBar from "./Header";
import { db } from "../config/firebase";
import { sections } from "./data";
import ContainerCard from "./ContainerCard";
import "../CSS/AllSection.css";

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
      <NavBar />
      <ContainerCard data={kids} btnText="Add To Cart"></ContainerCard>
    </>
  );
};

export default KidsCardList;
