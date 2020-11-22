import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Button, Form, Container, Row, Alert } from "react-bootstrap";
import * as CartService from "../services/CartService";
import NavBar from "../components/Header";
import { addToCart, getData, localToStore } from "../store/reducer";

const ItemDetailComponent = (props) => {
  const [sizeOrdered, setSize] = useState("");
  const [colorOrdered, setColor] = useState("");
  const [error, setError] = useState(false);

  const { image, element } = props.location.state;

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const validateFields = () => {
    if (
      sizeOrdered === "" ||
      colorOrdered === "" ||
      sizeOrdered === "Choose..." ||
      colorOrdered === "Choose..."
    )
      return false;
    return true;
  };

  const addCart = (item) => {
    if (validateFields()) {
      let itemOrdered = { ...item };
      delete itemOrdered.Sizes_Available;
      delete itemOrdered.Color_Available;
      itemOrdered.Size_Ordered = sizeOrdered;
      itemOrdered.Color_Ordered = colorOrdered;
      itemOrdered.Quantity = 1;
      itemOrdered.CompositeKey = item.id + sizeOrdered + colorOrdered;

      CartService.addItem(props.user, itemOrdered)
        .then((updatedItems) => {
          const payload = {
            data: updatedItems,
            userstate: props.user,
          };
          props.addToCart(payload);
        })
        .catch(console.error);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "10%" }}>
        <Row>
          <Col md={6} style={{ shadow: "2px black" }}>
            <img src={image} alt="" style={{ boxShadow: "1px 1px 8px -2px" }} />
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
                style={{
                  width: "100px",
                  display: "inline",
                  marginLeft: "10px",
                }}
                onChange={(e) => handleSize(e)}
                value={sizeOrdered || "Choose..."}
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
                style={{
                  width: "100px",
                  display: "inline",
                  marginLeft: "10px",
                }}
                onChange={(e) => handleColor(e)}
                value={colorOrdered || "Choose..."}
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
          <br />
          {error &&
            (sizeOrdered === "" ||
              colorOrdered === "" ||
              sizeOrdered === "Choose..." ||
              colorOrdered === "Choose...") && (
              <span className="error">Please Fill Both the Fields</span>
            )}
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
