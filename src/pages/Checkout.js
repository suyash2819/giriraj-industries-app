import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Button, Form } from "react-bootstrap";
import firebase from "firebase";
import { validPincode, validPhonenumber } from "../components/Utils";
import NavBar from "../components/Header";
import { getData, localToStore } from "../store/reducer";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";
import "../CSS/Checkout.css";

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
            pincode: "Please enter a valid pincode",
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
            pincode: address.pincode,
            country: address.country,
            phonenumber: value,
          });
          setError({
            phonenumber: "",
            pincode: error.pincode,
          });
        } else {
          setError({
            phonenumber: "Please enter a valid phone number",
            pincode: error.pincode,
          });
        }
        break;

      default:
        break;
    }
  };

  const addressFields = [
    {
      type: "text",
      id: "",
      placeholder: "Address Line 1",
      name: "address Line 1",
      onChange: (e) => {
        setAddress({
          addressLine1: e.target.value,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
          phonenumber: address.phonenumber,
        });
      },
    },
    {
      type: "text",
      id: "",
      placeholder: "Address Line 2",
      name: "address Line 2",
      onChange: (e) => {
        setAddress({
          addressLine1: address.addressLine1,
          addressLine2: e.target.value,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
          phonenumber: address.phonenumber,
        });
      },
    },
    {
      type: "text",
      id: "",
      placeholder: "City",
      name: "City",
      onChange: (e) => {
        setAddress({
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: e.target.value,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
          phonenumber: address.phonenumber,
        });
      },
    },
    {
      type: "text",
      id: "",
      placeholder: "State",
      name: "State",
      onChange: (e) => {
        setAddress({
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: e.target.value,
          pincode: address.pincode,
          country: address.country,
          phonenumber: address.phonenumber,
        });
      },
    },

    {
      type: "number",
      id: "",
      placeholder: "Pin Code",
      name: "pincode",
      onChange: (e) => {
        handleChange(e);
      },
    },
    {
      type: "text",
      id: "",
      placeholder: "Country",
      name: "Country",
      onChange: (e) => {
        setAddress({
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: e.target.value,
          phonenumber: address.phonenumber,
        });
      },
    },
    {
      type: "number",
      id: "",
      placeholder: "Phone Number",
      name: "phonenumber",
      onChange: (e) => {
        handleChange(e);
      },
    },
  ];
  console.log(address);
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
            <Row className="itemRow">
              <center>
                <Form>
                  {addressFields.map((field) => (
                    <>
                      <Form.Group>
                        <Form.Control
                          type={field.type}
                          id={field}
                          placeholder={field.placeholder}
                          required
                          name={field.name}
                          onChange={field.onChange}
                        />
                        {field.name === "phonenumber" &&
                          error.phonenumber.length > 0 && (
                            <span className="error">{error.phonenumber}</span>
                          )}
                        {field.name === "pincode" &&
                          error.pincode.length > 0 && (
                            <span className="error">{error.pincode}</span>
                          )}
                      </Form.Group>
                    </>
                  ))}

                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="addAddress"
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
