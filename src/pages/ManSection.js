import React, { useState, useEffect } from "react";
import NavBar from "../components/Header";
import { db } from "../config/firebase";
import { sections } from "../data";
import ContainerCard from "../components/ContainerCard";
import "../CSS/AllSection.css";

const ManCardList = () => {
  const [men, setMen] = useState([]);
  useEffect(() => {
    db.collection(sections.men).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        item_num: 0,
        id: doc.id,
        ...doc.data(),
      }));
      setMen(data);
    });
  }, []);
  return (
    <>
      <NavBar />
      <ContainerCard data={men} btnText="Add To Cart"></ContainerCard>
    </>
  );
};

export default ManCardList;
