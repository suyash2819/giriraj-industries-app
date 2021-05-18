import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Button, Col } from "react-bootstrap";
import cryptoRandomString from "crypto-random-string";
import AlertMessage from "../components/AlertMessage";
import NavBar from "../components/Header";
import "../CSS/AllSection.css";
import "../CSS/Payment.css";
import handleOrders from "../services/OrderService";
import Loader from "../components/Loader";
import { createOrderUrl, logo } from "../data";

const PaymentComponent = (props) => {
  const [orderFetchLoader, setOrderFetchLoader] = useState(false);
  const [order, setOrder] = useState({
    orderDate: "",
    orderId: "",
    paymentId: "",
    paymentSignature: "",
    totalCost: 0,
    deliveryAddress: "",
    paymentVerified: "N",
  });

  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const isFirstRun = useRef(true);
  let totalCost = 0;

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    handleOrders(props.user.uid, { ...order, itemsOrdered: props.cartItems });
  }, [order]);

  // if a user has not entered the delivery address
  if (props.location.state === undefined) return <Redirect to="/checkout" />;

  const { deliveryAddress, contactnumber } = props.location.state;

  const alertMessageDisplay = () => {
    setShowAlert({ show: false });
  };

  const fetchOrderId = () => {
    return axios
      .post(createOrderUrl, { cartItems: props.cartItems })
      .then((orderDetails) => {
        return orderDetails.data.id;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openPaymentModal = () => {
    setOrderFetchLoader(true);

    fetchOrderId().then((orderId) => {
      setOrderFetchLoader(false);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: totalCost * 100,
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

          setOrder({
            orderDate: new Date(),
            orderId,
            paymentId: response.razorpay_payment_id,
            paymentSignature: response.razorpay_signature,
            totalCost,
            deliveryAddress,
            paymentVerified: "N",
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
    });
  };

  const payOnDelivery = () => {
    setShowAlert({
      success: true,
      message: "Order Placed",
      show: true,
    });
    const orderId = cryptoRandomString({
      length: 10,
      type: "alphanumeric",
    });
    setOrder({
      orderDate: new Date(),
      orderId,
      paymentId: null,
      totalCost,
      deliveryAddress,
    });
  };

  if (orderFetchLoader) return <Loader />;

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
        <div className="row justify-content-center">
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              alertDisplay={alertMessageDisplay}
            />
          ) : null}
        </div>
        <div className="Items">
          {props.cartItems.map((el) => {
            totalCost += parseInt(el.Cost * el.Quantity);
            return (
              <>
                <Row key={el.id} className="ItemRow">
                  <Col md={4} key={el.Item_Name}>
                    <center>
                      <p>
                        <b>{el.Item_Type}</b>
                      </p>
                      <p>{el.Item_Name}</p>
                    </center>
                  </Col>
                  <Col md={4} key={el.Item_Type}>
                    <center>
                      <p>{`Size: ${el.Size_Ordered}`}</p>
                      <p>{`Color: ${el.Color_Ordered}`}</p>
                    </center>
                  </Col>
                  <Col md={4} key={el.Cost}>
                    <center>
                      <p>
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
            <Col md={4}>
              <center>
                <h6>Total Cost</h6>
              </center>
            </Col>
            <Col md={4} />
            <Col md={4}>
              <center>
                <b>
                  <p>Rs.{totalCost}</p>
                </b>
              </center>
            </Col>
          </Row>
        </div>
        <center>
          <Button
            variant="primary"
            onClick={openPaymentModal}
            className="payOnline"
          >
            Pay Online
          </Button>
          <Button variant="primary" onClick={payOnDelivery}>
            Pay On Delivery
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
  loader: state.loaderstate.loader,
});

const Payment = connect(mapStateToProps, null)(PaymentComponent);

export default Payment;
