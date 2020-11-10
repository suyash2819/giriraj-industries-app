import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import NavBar from "../components/Header";
import {
  removeFromCart,
  getData,
  localToStore,
  addToCart,
} from "../store/reducer";
import { db } from "../config/firebase";
import getFromDb from "../components/Utils";
import * as CartService from "../services/CartService";
import "../CSS/AllSection.css";

const CheckoutComponent = (props) => {
  console.log(props.cartItems);
  var totalCost = 0;
  useEffect(() => {}, [props.cartItems]);
  return (
    <>
      <NavBar />
      <Container>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Type</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          {props.cartItems.map((el) => {
            totalCost += parseInt(el.Cost);
            return (
              <>
                <tbody key={el.id}>
                  <tr
                    style={{
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: "5px",
                      width: "100%",
                    }}
                    key={el.id}
                  >
                    <td>
                      <img
                        src={el.Image_url}
                        alt=""
                        style={{ height: "50px", width: "50px" }}
                      />
                    </td>
                    <td key={el.id}>
                      <p>{el.Item_Type}</p>
                    </td>
                    <td>
                      <p>{el.Description}</p>
                    </td>
                    <td>
                      <p>{el.item_num}</p>
                    </td>
                    <td>{parseInt(el.Cost) * parseInt(el.item_num)}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
        <p style={{ float: "right" }}>Total Cost = {totalCost}</p>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
  loader: state.loaderstate.loader,
});

const Checkout = connect(mapStateToProps)(CheckoutComponent);

export default Checkout;
