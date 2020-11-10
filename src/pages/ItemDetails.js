/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Card, Col, Button, Form, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as CartService from "../services/CartService";
import NavBar from "../components/Header";
import { addToCart, getData, localToStore } from "../store/reducer";

const ItemDetailComponent = (props) => {
  const [sizeOrdered, setSize] = useState("");
  const [colorOrdered, setColor] = useState("");
  // const [quantityOrdered, setQuantity] = useState("");

  const {
    id,
    image,
    itemType,
    description,
    cost,
    badgeNum = null,
    onClick,
    sizes,
    colors,
    btnText,
    element,
    cartDisplay,
  } = props.location.state;
  // console.log(props.location.state);
  // const img = props.location.state.image;
  // const el = props.location.state.element;
  // const {handleSize} = props.location.state;
  // const handleColor = props.location.state.handleColor;
  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  // const handleQuantity = (e) => {
  //   setQuantity(e.target.value);
  // };
  console.log(sizeOrdered, " ", colorOrdered);

  const addCart = (item) => {
    let itemOrdered = { ...item };
    delete itemOrdered.Sizes_Available;
    delete itemOrdered.Color_Available;
    itemOrdered.Size_Ordered = sizeOrdered;
    // itemOrdered.Size_Ordered[size] = true;
    itemOrdered.Color_Ordered = colorOrdered;
    // itemOrdered.Color_Ordered[color] = true;
    // itemOrdered.Quantity = quantityOrdered;
    itemOrdered.CompositeKey = item.id + sizeOrdered + colorOrdered;
    console.log(item, " ", itemOrdered);
    CartService.addItem(props.user, itemOrdered)
      .then((updatedItems) => {
        const payload = {
          data: updatedItems,
          userstate: props.user,
        };
        props.addToCart(payload);
      })
      .catch(console.error);
  };

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "10%" }}>
        <Row>
          <Col md={6} style={{ shadow: "2px black" }}>
            {/* <Card style={{ width: "100%", height: "100%" }}> */}
            {/* <Card.Img src={props.location.state.image} /> */}
            <img src={image} alt="" style={{ boxShadow: "1px 1px 8px -2px" }} />
            {/* </Card> */}
          </Col>
          <Col md={6}>
            <h3>{element.Item_Type}</h3>
            <h5 style={{ color: "grey" }}>{element.Item_Name}</h5>
            <br />
            <h3>Rs. {element.Cost}</h3>
            <br />
            <Form.Group controlId="formGridState">
              <Form.Label>Size</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                style={{
                  width: "100px",
                  display: "inline",
                  marginLeft: "10px",
                }}
                onChange={(e) => handleSize(e)}
                value={sizeOrdered}
              >
                <option>Choose...</option>
                {Object.keys(element.Sizes_Available).map(
                  (size) =>
                    !!element.Sizes_Available[size] && <option>{size}</option>
                )}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="formGridState">
              <Form.Label>Color</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                style={{
                  width: "100px",
                  display: "inline",
                  marginLeft: "10px",
                }}
                onChange={(e) => handleColor(e)}
                value={colorOrdered}
              >
                <option>Choose...</option>
                {Object.keys(element.Color_Available).map(
                  (color) =>
                    !!element.Color_Available[color] && <option>{color}</option>
                )}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <br />

        <center>
          <Button variant="primary" onClick={() => addCart(element)}>
            Add To Cart
          </Button>
        </center>
        <br />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: bindActionCreators(addToCart, dispatch),
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
});

const ItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailComponent);

export default ItemDetail;
