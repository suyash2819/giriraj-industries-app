import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Button, Form, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NavBar from "./Header";
import CardDisplay from "./Card";
import {
  removeFromCart,
  getData,
  localToStore,
  addToCart,
} from "../store/reducer";
import { db } from "../config/firebase";
import getFromDb from "./Utils";
import * as CartService from "../services/CartService";
import "../CSS/AllSection.css";
import debounce from "lodash.debounce";

const CartDisplayComponent = (props) => {
  const [cartDisplay, setCartDisplay] = useState(true);
  var totalCost = 0;

  useEffect(() => {
    if (!!props.user) {
      db.collection("UserCart")
        .doc(props.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (!!localStorage.getItem("items")) {
              CartService.syncDBFromLocal(doc, props.user.uid)
                .then((updateddata) => {
                  localStorage.clear();
                  props.getData(updateddata);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              props.getData(doc.data().Cart_Items);
            }
          } else {
            db.collection("UserCart")
              .doc(props.user.uid)
              .set({
                Cart_Items: JSON.parse(localStorage.getItem("items")) || [],
              })
              .then(() => {
                localStorage.clear();
                getFromDb(props.user.uid).then((datadoc) => {
                  props.getData(datadoc);
                });
              });
          }
        });
    } else {
      props.localToStore();
    }
  }, []);

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
  // if (props.cartItems.length === 0) {
  //   return (
  //     <Container>
  //       <center>
  //         <Spinner animation="border" role="status">
  //           <span className="sr-only">Loading...</span>
  //         </Spinner>
  //       </center>
  //     </Container>
  //   );
  // }
  return (
    <>
      <NavBar />
      {props.cartItems.length && (
        <>
          <Container>
            <center>
              <h4 style={{ color: "grey" }}>Cart --- Address --- Payment</h4>
            </center>
            <hr />
            <br />

            <div className="Items">
              {props.cartItems.map((el) => {
                totalCost += parseInt(el.Cost * el.Quantity);
                return (
                  <>
                    <Row style={{ marginBottom: "20px" }} key={el.id}>
                      <Col md={3}>
                        <center>
                          <img
                            src={el.Image_url}
                            alt=""
                            style={{ height: "100px", width: "100px" }}
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
                          <p>Size: {el.Size_Ordered}</p>
                          <p>Color: {el.Color_Ordered}</p>

                          <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder=""
                              style={{
                                width: "80px",
                                display: "inline",
                                marginLeft: "3%",
                                height: "35px",
                              }}
                              min="1"
                              value={el.Quantity || ""}
                              onChange={(e) => handleQuantity(e, el)}
                            />
                          </Form.Group>
                        </center>
                      </Col>
                      <Col md={3}>
                        <center>
                          <p style={{}}>
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
                    <h6 style={{}}>Total Cost</h6>
                  </center>
                </Col>
                <Col md={3}></Col>
                <Col md={3}></Col>
                <Col md={3}>
                  <center>
                    <b>
                      <p style={{}}>Rs.{totalCost}</p>
                    </b>
                  </center>
                </Col>
              </Row>
            </div>
          </Container>
          <br />
          <center>
            <Button
              variant="primary"
              style={{ height: "50px", marginBottom: "20px" }}
            >
              <Link
                to="/checkout"
                className="nav-link"
                style={{ color: "white" }}
              >
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
