import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Button, Col, Form, Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import AlertMessage from "../components/AlertMessage";
import NavBar from "../components/Header";
import "../CSS/AllSection.css";
import "../CSS/Payment.css";
import * as orderService from "../services/UserService";
import { generateHashUrl } from "../data";
import { createOrderUrl, logo } from "../data";

const ShowItems = (props) => {
  let { totalCost, cartItems } = props;
  return (
    <>
      {cartItems.map((el) => {
        totalCost += parseInt(el.Cost * el.Quantity);
        return (
          <React.Fragment key={el.CompositeKey}>
            <Row className="ItemRow">
              <Col md={4}>
                <center>
                  <p>
                    <b>{el.Item_Type}</b>
                  </p>
                  <p>{el.Item_Name}</p>
                </center>
              </Col>
              <Col md={4}>
                <center>
                  <p>{`Size: ${el.Size_Ordered}`}</p>
                  <p>{`Color: ${el.Color_Ordered}`}</p>
                </center>
              </Col>
              <Col md={4}>
                <center>
                  <p>
                    <b>Rs. {parseInt(el.Cost) * parseInt(el.Quantity)}</b>
                  </p>
                </center>
              </Col>
            </Row>
            <hr />
          </React.Fragment>
        );
      })}
      <Row>
        <Col md={4}>
          <center>
            <h6>Total Cost</h6>
          </center>
        </Col>
        <Col md={4}></Col>
        <Col md={4}>
          <center>
            <b>
              <p>Rs.{totalCost}</p>
            </b>
          </center>
        </Col>
      </Row>
    </>
  );
};

const PaymentComponent = (props) => {
  const [paymentChoice, setPaymentChoice] = useState(null);

  const [order, setOrder] = useState({
    orderDate: "",
    orderId: "",
    paymentId: null,
    paymentSignature: null,
    totalCost: 0,
    deliveryAddress: "",
    paymentVerified: false,
  });

  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const isFirstRun = useRef(true);
  const choicesOfPayment = ["Pay Online", "Pay on Delivery"];
  const [loading, setLoading] = useState(false);
  const [paymentChoiceError, setPaymentChoiceError] = useState(false);
  let totalCost = 0;

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    orderService
      .addNewOrders(
        props.user.uid,
        { ...order, itemsOrdered: props.cartItems },
        order.orderId
      )
      .then((d) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [order]);

  // if a user has not entered the delivery address
  if (props.location.state === undefined) return <Redirect to="/checkout" />;

  const { deliveryAddress, contactnumber } = props.location.state;

  const alertMessageDisplay = () => {
    setShowAlert({ show: false });
    setPaymentChoiceError(false);
  };

  const openPaymentModal = (orderId, orderTotalCost) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: orderTotalCost * 100,
      currency: "INR",
      name: "Giriraj Industries",
      description: "Test Transaction",
      image: logo,
      order_id: orderId,
      handler: (response) => {
        setShowAlert({
          success: true,
          message: "Payment Successful, Order Placed",
          show: true,
        });

        axios.post(generateHashUrl, {
          order,
          orderId,
          paymentId: response.razorpay_payment_id,
          paymentSignature: response.razorpay_signature,
          userId: props.user.uid,
        });
      },
      prefill: {
        name: props.user.displayName,
        email: props.user.email,
        contact: contactnumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    let rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      setShowAlert({
        success: false,
        message: response.error.description,
        show: true,
      });
    });
    rzp1.open();
  };

  const payOnDelivery = () => {
    setShowAlert({
      success: true,
      message: "Order Placed",
      show: true,
    });
  };

  const fetchOrderId = () => {
    if (!paymentChoice) {
      setPaymentChoiceError(true);
    } else {
      setLoading(true);
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          // Sending token to your backend via HTTPS
          return axios
            .post(
              createOrderUrl,
              { userId: props.user.uid },
              {
                headers: {
                  userToken: idToken,
                },
              }
            )
            .then((orderDetails) => {
              console.log(orderDetails);
              setLoading(false);

              if (paymentChoice === choicesOfPayment[0]) {
                setOrder({
                  orderDate: new Date(),
                  orderId: orderDetails.data.order.id,
                  paymentId: null,
                  paymentSignature: null,
                  totalCost: orderDetails.data.totalCost,
                  deliveryAddress,
                  paymentVerified: false,
                });
                openPaymentModal(
                  orderDetails.data.order.id,
                  orderDetails.data.totalCost
                );
              } else {
                setOrder({
                  orderDate: new Date(),
                  orderId: orderDetails.data.order.id,
                  totalCost: orderDetails.data.totalCost,
                  deliveryAddress,
                  paymentVerified: false,
                });
                payOnDelivery();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(function (error) {});
    }
  };

  const handlePaymentChoice = (e) => {
    setPaymentChoice(e.target.name);
  };

  if (loading) {
    return (
      <div>
        <center>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </center>
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <Container>
        <center>
          <h2>Select a Payment Method</h2>
        </center>
        <br />
        <center>
          <h6>
            <u>Items</u>
          </h6>
        </center>
        <br />
        <div className="Items">
          <ShowItems totalCost={totalCost} cartItems={props.cartItems} />
        </div>
        <center>
          <h6>select payment method</h6>
          {choicesOfPayment.map((choice) => (
            <Form.Group
              controlId="formBasicCheckbox"
              style={{ display: "inline", marginRight: "50px" }}
              key={choice}
            >
              <Form.Check
                type="checkbox"
                label={choice}
                name={choice}
                checked={paymentChoice === choice}
                onChange={handlePaymentChoice}
                style={{ display: "inline" }}
              />
            </Form.Group>
          ))}

          <Button
            variant="primary"
            onClick={fetchOrderId}
            className="payOnline"
            style={{ display: "block", margin: "10px" }}
          >
            Place Order
          </Button>
          <div className="row justify-content-center">
            {showAlert.show ? (
              <AlertMessage
                success={showAlert.success}
                message={showAlert.message}
                alertDisplay={alertMessageDisplay}
              />
            ) : null}
          </div>
          <div className="row justify-content-center">
            {paymentChoiceError ? (
              <AlertMessage
                success={false}
                message="please choose method of payment"
                alertDisplay={alertMessageDisplay}
              />
            ) : null}
          </div>
        </center>
        <br />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
  loader: state.loaderstate.loader,
});

const Payment = connect(mapStateToProps, null)(PaymentComponent);
export default Payment;
