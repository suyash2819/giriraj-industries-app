import React, { useCallback } from "react";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import NavBar from "./Header";
import {
  removeFromCart,
  getData,
  localToStore,
  addToCart,
} from "../store/reducer";
import * as CartService from "../services/CartService";
import "../CSS/CartDisplay.css";

const CartDisplayComponent = (props) => {
  let totalCost = 0;

  const updateStorageWithQuantity = useCallback(
    debounce(
      (cartItems, user) => CartService.updateQuantityOfItem(cartItems, user),
      5000
    ),
    []
  );

  const handleQuantity = (e, item) => {
    e.persist();
    let updatedItems = [...props.cartItems];

    //  Quantity Property used here, if name changes in db make sure to do it here too
    updatedItems.forEach((localItem, localIndex, updatedItems) => {
      if (localItem.CompositeKey === item.CompositeKey) {
        updatedItems[localIndex].Quantity = parseInt(e.target.value);
      }
    });
    const payload = {
      data: updatedItems,
      userstate: props.user,
    };
    props.addToCart(payload);
    updateStorageWithQuantity(updatedItems, props.user);
  };

  const removeItem = (el) => {
    CartService.removeItem(props.user, el, [...props.cartItems])
      .then((updatedData) => {
        const payload = {
          data: updatedData,
          userstate: props.user,
        };
        props.removeFromCart(payload);
      })
      .catch(console.error);
  };

  return (
    <>
      <NavBar />
      {props.cartItems.length && (
        <>
          <Container>
            <center>
              <h4 className="header">Cart --- Address --- Payment</h4>
            </center>
            <hr />
            <br />

            <div className="Items">
              {props.cartItems.map((el) => {
                totalCost += parseInt(el.Cost * el.Quantity);
                return (
                  <>
                    <Row key={el.id} className="ItemRow">
                      <Col md={3}>
                        <center>
                          <img
                            src={el.Image_url}
                            alt={el.Item_Name}
                            className="Itemimage"
                          />
                          <br />
                          <br />
                          <Button
                            variant="primary"
                            onClick={() => removeItem(el) || null}
                          >
                            Remove Item
                          </Button>
                        </center>
                      </Col>
                      <Col md={3}>
                        <center>
                          <p>
                            <b>{el.Item_Type}</b>
                          </p>
                          <p>
                            <b>{el.Item_Name}</b>
                          </p>
                          <p>{el.Description}</p>
                        </center>
                      </Col>
                      <Col mad={3}>
                        <center>
                          <p>{`Size: ${el.Size_Ordered}`}</p>
                          <p>{`Color: ${el.Color_Ordered}`}</p>

                          <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder=""
                              min="1"
                              className="quantity"
                              value={el.Quantity || ""}
                              onChange={(e) => handleQuantity(e, el)}
                            />
                          </Form.Group>
                        </center>
                      </Col>
                      <Col md={3}>
                        <center>
                          <p>
                            <b>
                              Rs. {parseInt(el.Cost) * parseInt(el.Quantity)}
                            </b>
                          </p>
                        </center>
                      </Col>
                    </Row>
                    <hr />
                  </>
                );
              })}
              <Row>
                <Col md={3}>
                  <center>
                    <h6>Total Cost</h6>
                  </center>
                </Col>
                <Col md={3}></Col>
                <Col md={3}></Col>
                <Col md={3}>
                  <center>
                    <b>
                      <p>Rs.{totalCost}</p>
                    </b>
                  </center>
                </Col>
              </Row>
            </div>
          </Container>
          <br />
          <center>
            <Button variant="primary" className="checkoutButton">
              <Link to="/checkout" className="checkoutLink">
                Checkout
              </Link>
            </Button>
          </center>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
  loader: state.loaderstate.loader,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch),
});

const CartDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDisplayComponent);

export default CartDisplay;
