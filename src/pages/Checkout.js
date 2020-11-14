import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Button, Form } from "react-bootstrap";
import firebase from "firebase";

import NavBar from "../components/Header";
import { getData, localToStore } from "../store/reducer";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";

const CheckoutComponent = (props) => {
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: 0,
    country: "",
    phonenumber: 0,
  });

  const [error, setError] = useState({
    phonenumber: "",
    pincode: "",
  });

  const [addressExists, setAddressExists] = useState([]);

  const validPincode = RegExp(/^[1-9](\d{5})$/i);

  const validPhonenumber = RegExp(/^[0-9]\d{9}$/i);

  useEffect(() => {
    if (!!props.user) {
      db.collection("UserOrders")
        .doc(props.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setAddressExists(doc.data().Address);
          } else {
            db.collection("UserOrders").doc(props.user.uid).set({
              Address: [],
            });
          }
        });
    }
  }, []);

  const validateForm = () => {
    let valid = true;
    Object.values(error).forEach((value) => {
      value.length > 0 && (valid = false);
    });
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      db.collection("UserOrders")
        .doc(props.user.uid)
        .update({
          Address: firebase.firestore.FieldValue.arrayUnion(address),
        })
        .then(() => {
          setAddress({
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: 0,
            country: "",
            phonenumber: 0,
          });
        });
    } else {
      console.log("invalid");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "pincode":
        if (validPincode.test(value)) {
          setAddress({
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            pincode: value,
            country: address.country,
            phonenumber: address.phonenumber,
          });
          setError({
            phonenumber: error.phonenumber,
            pincode: "",
          });
        } else {
          setError({
            phonenumber: error.phonenumber,
            pincode:
              "invalid pincode, it should be of 6 digits and should not start with  0",
          });
        }
        break;

      case "phonenumber":
        if (validPhonenumber.test(value)) {
          setAddress({
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            pincode: address.phonenumber,
            country: address.country,
            phonenumber: value,
          });
          setError({
            phonenumber: "",
            pincode: error.pincode,
          });
        } else {
          setError({
            phonenumber: "invalid phone number, it should be of 10 digits",
            pincode: error.pincode,
          });
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        {addressExists.length > 0 ? (
          <>
            <center>
              <h2>Address</h2>
            </center>
            <br />
            {addressExists.map((ad) => (
              <Form.Check
                type="checkbox"
                id=""
                label={
                  ad.addressLine1 +
                  ad.addressLine2 +
                  " " +
                  ad.city +
                  ad.state +
                  " " +
                  ad.pincode
                }
              />
            ))}
          </>
        ) : (
          <>
            {" "}
            <center>
              <h2>Address</h2>
            </center>
            <br />
            <Row style={{ display: "block" }}>
              <center>
                <Form style={{ width: "50%" }}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      id=""
                      placeholder="Address Line 1"
                      required
                      onChange={(e) =>
                        setAddress({
                          addressLine1: e.target.value,
                          addressLine2: address.addressLine2,
                          city: address.city,
                          state: address.state,
                          pincode: address.phonenumber,
                          country: address.country,
                          phonenumber: address.phonenumber,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="text"
                      id=""
                      placeholder="Address Line 2"
                      required
                      // value={userInfo.userPassword}
                      onChange={(e) =>
                        setAddress({
                          addressLine1: address.addressLine1,
                          addressLine2: e.target.value,
                          city: address.city,
                          state: address.state,
                          pincode: address.phonenumber,
                          country: address.country,
                          phonenumber: address.phonenumber,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="text"
                      id=""
                      placeholder="City"
                      required
                      onChange={(e) =>
                        setAddress({
                          addressLine1: address.addressLine1,
                          addressLine2: address.addressLine2,
                          city: e.target.value,
                          state: address.state,
                          pincode: address.phonenumber,
                          country: address.country,
                          phonenumber: address.phonenumber,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="text"
                      id=""
                      placeholder="State"
                      required
                      onChange={(e) =>
                        setAddress({
                          addressLine1: address.addressLine1,
                          addressLine2: address.addressLine2,
                          city: address.city,
                          state: e.target.value,
                          pincode: address.phonenumber,
                          country: address.country,
                          phonenumber: address.phonenumber,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="number"
                      id=""
                      placeholder="Pin Code"
                      required
                      name="pincode"
                      onChange={(e) => handleChange(e)}
                    />
                    {error.pincode.length > 0 && (
                      <span
                        className="error"
                        style={{ fontSize: "11px", color: "red" }}
                      >
                        {error.pincode}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="text"
                      id=""
                      placeholder="Country"
                      onChange={(e) =>
                        setAddress({
                          addressLine1: address.addressLine1,
                          addressLine2: address.addressLine2,
                          city: address.city,
                          state: address.state,
                          pincode: address.phonenumber,
                          country: e.target.value,
                          phonenumber: address.phonenumber,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="text"
                      id=""
                      placeholder="Phone Number"
                      className="required"
                      required
                      name="phonenumber"
                      onChange={(e) => handleChange(e)}
                    />
                    {error.phonenumber.length > 0 && (
                      <span
                        className="error"
                        style={{ fontSize: "11px", color: "red" }}
                      >
                        {error.phonenumber}
                      </span>
                    )}
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    style={{ marginBottom: "10px" }}
                  >
                    Add Address
                  </Button>
                </Form>
              </center>{" "}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.userstate.user,
  loader: state.loaderstate.loader,
});

const mapDispatchToProps = (dispatch) => ({
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
});

const Checkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutComponent);

export default Checkout;
