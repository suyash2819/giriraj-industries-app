import React from "react";
import Navbar from "./Header";
import "../CSS/AllSection.css";
import ContainerCard from "./ContainerCard";

const CartDisplay = () => {
  const items = JSON.parse(localStorage.getItem("items"));
  return (
    <>
      <Navbar />
      {items ? (
        <ContainerCard data={items} btnText="Remove From Cart"></ContainerCard>
      ) : null}
    </>
  );
};

export default CartDisplay;
