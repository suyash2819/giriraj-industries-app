import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Button, Form } from "react-bootstrap";
import addAddress from "../services/CheckoutService";
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
    pincode: "",
    country: "",
    phonenumber: "",
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
      addAddress(props.user.uid, address).then(() => {
        setAddress({
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          phonenumber: "",
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
        setAddress({
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: value,
          country: address.country,
          phonenumber: address.phonenumber,
        });
        if (validPincode.test(value)) {
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
        setAddress({
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
          phonenumber: value,
        });
        if (validPhonenumber.test(value)) {
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
      value: address.addressLine1,
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
      value: address.addressLine2,
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
      value: address.city,
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
      value: address.state,
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
      value: address.pincode,
      onChange: (e) => {
        handleChange(e);
      },
    },
    {
      type: "text",
      id: "",
      placeholder: "Country",
      name: "Country",
      value: address.country,
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
      value: address.phonenumber,
      onChange: (e) => {
        handleChange(e);
      },
    },
  ];

  const formattedAddress = (ad) => {
    return (
      ad.addressLine1 +
      ad.addressLine2 +
      " " +
      ad.city +
      ad.state +
      " " +
      ad.pincode
    );
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
                label={formattedAddress(ad)}
                key={ad.addressLine1}
              />
            ))}
          </>
        ) : (
          <>
            <center>
              <h2>Address</h2>
            </center>
            <br />
            <Row className="itemRow">
              <center>
                <Form
                  id="addressForm"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {addressFields.map((field) => (
                    <>
                      <Form.Group key={field.name}>
                        <Form.Control
                          type={field.type}
                          id={field}
                          placeholder={field.placeholder}
                          required
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          key={field.placeholder}
                        />
                        {field.name === "phonenumber" &&
                          error.phonenumber.length > 0 && (
                            <span className="error" key={error.phonenumber}>
                              {error.phonenumber}
                            </span>
                          )}
                        {field.name === "pincode" && error.pincode.length > 0 && (
                          <span className="error" key={error.pincode}>
                            {error.pincode}
                          </span>
                        )}
                      </Form.Group>
                    </>
                  ))}

                  <Button
                    type="submit"
                    variant="primary"
                    className="addAddress"
                  >
                    Add Address
                  </Button>
                </Form>
              </center>
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
