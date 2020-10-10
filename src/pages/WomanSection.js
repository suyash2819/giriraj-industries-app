import React, { useState, useEffect } from "react";
import NavBar from "../components/Header";
import "../CSS/AllSection.css";
import { db } from "../config/firebase";
import { sections } from "../data";
import ContainerCard from "../components/ContainerCard";
import "../CSS/AllSection.css";

const WomanCardList = () => {
  const [women, setWomen] = useState([]);
  useEffect(() => {
    db.collection(sections.women).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        item_num: 0,
        id: doc.id,
        ...doc.data(),
      }));
      setWomen(data);
    });
  }, []);
  return (
    <>
      <NavBar />
      <ContainerCard data={women} btnText="Add To Cart"></ContainerCard>
    </>
  );
};

export default WomanCardList;
