import React from "react";
import { connect } from "react-redux";
import "../CSS/AllSection.css";
import Section from "./section";

const ManCardList = ({ cartItems }) => {
  return <Section name="men" title="Man" cartItems={cartItems} />;
};

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ManCardList);
