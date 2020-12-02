import React from "react";
import { connect } from "react-redux";
import "../../CSS/AllSection.css";
import { Section } from "./components";

const GenericSectionContainer = ({ cartItems, name, title }) => {
  return <Section name={name} title={title} cartItems={cartItems} />;
};

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
});

export default connect(mapStateToProps, null)(GenericSectionContainer);
