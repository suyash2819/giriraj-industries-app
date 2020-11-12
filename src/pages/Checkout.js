import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import NavBar from "../components/Header";
import { getData, localToStore, addToCart } from "../store/reducer";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";

const CheckoutComponent = (props) => {
  useEffect(() => {
    if (!!props.user) {
      db.collection("UserCart")
        .doc(props.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            props.getData(doc.data().Cart_Items);
          }
        });
    } else {
      props.localToStore();
    }
  }, []);
  var totalCost = 0;

  if (props.cartItems.length === 0) {
    return (
      <Container>
        <center>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </center>
      </Container>
    );
  }
  return (
    <>
      <NavBar />
      <Container>
        <center>
          <h4 style={{ color: "grey" }}>
            Confirm Your Order --- Address --- Payment
          </h4>
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
                      <p>Quantity {el.Quantity}</p>
                    </center>
                  </Col>
                  <Col md={3}>
                    <center>
                      <p style={{}}>
                        <b>Rs. {parseInt(el.Cost) * parseInt(el.Quantity)}</b>
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
        <center>
          <Button
            variant="primary"
            style={{ height: "50px", marginBottom: "10px" }}
          >
            <Link
              to="/checkout"
              className="nav-link"
              style={{ color: "white" }}
            >
              Fill Address and Pay
            </Link>
          </Button>
        </center>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
  loader: state.loaderstate.loader,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: bindActionCreators(addToCart, dispatch),
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
});

const Checkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutComponent);

export default Checkout;
