import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { validPincode, validPhonenumber } from "../components/Utils";
import NavBar from "../components/Header";
import { getData, localToStore } from "../store/reducer";
import { db } from "../config/firebase";
import Loader from "../components/Loader";
import "../CSS/AllSection.css";
import "../CSS/Checkout.css";

import * as UserService from "../services/UserService";

function AddressForm({ onSave }) {
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phonenumber: "",
    label: "",
  });
  const [error, setError] = useState({});

  const addressFields = [
    {
      type: "text",
      id: "",
      placeholder: "Address Line 1",
      name: "addressLine1",
      value: address.addressLine1,
    },
    {
      type: "text",
      id: "",
      placeholder: "Address Line 2",
      name: "addressLine2",
      value: address.addressLine2,
    },
    {
      type: "text",
      id: "",
      placeholder: "City",
      name: "city",
      value: address.city,
    },
    {
      type: "text",
      id: "",
      placeholder: "State",
      name: "state",
      value: address.state,
    },

    {
      type: "number",
      id: "",
      placeholder: "Pin Code",
      name: "pincode",
      value: address.pincode,
    },
    {
      type: "text",
      id: "",
      placeholder: "Country",
      name: "country",
      value: address.country,
    },
    {
      type: "number",
      id: "",
      placeholder: "Phone Number",
      name: "phonenumber",
      value: address.phonenumber,
    },
    {
      type: "text",
      id: "",
      placeholder: "Home address or Office address or others",
      name: "label",
      value: address.label,
    },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    // eslint-disable-next-line
    const newAddress = Object.assign({}, address, { [name]: value });

    switch (name) {
      case "pincode":
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

    setAddress(newAddress);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (error.pincode || error.phonenumber) {
      return;
    }

    onSave(address);
  }

  return (
    <Form id="addressForm" onSubmit={handleSubmit}>
      {addressFields.map((field) => (
        <Form.Group key={field.name}>
          <Form.Control
            type={field.type}
            id={field}
            placeholder={field.placeholder}
            required
            name={field.name}
            value={field.value}
            onChange={handleChange}
            key={field.placeholder}
          />
          {error[field.name] && error[field.name].length > 0 && (
            <span className="error" key={error[field.name]}>
              {error[field.name]}
            </span>
          )}
        </Form.Group>
      ))}

      <Button type="submit" variant="primary" className="addAddress">
        Submit New Address
      </Button>
    </Form>
  );
}

const CheckoutComponent = (props) => {
  const [addressExists, setAddressExists] = useState([]);
  const [addMultipleAddress, setMultipleAddress] = useState(false);
  const [checkedAddress, setCheckedAddress] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (props.user) {
      UserService.listAddresses(props.user).then((snapshot) => {
        setAddressExists(
          snapshot.docs.map((doc) => Object.assign({ id: doc.id }, doc.data()))
        );
        setShowLoader(false);
      });
    }
  }, []);

  const handleAddressSave = (_address) => {
    const newAddressPromise = UserService.addNewAddress(props.user, _address);

    newAddressPromise.then(() => {
      const allAddresses = Array.from(addressExists);

      allAddresses.push(_address);

      setAddressExists(allAddresses);
      setMultipleAddress(false);
    });

    return newAddressPromise;
  };

  const formattedAddress = (ad) => {
    const { addressLine1, addressLine2, city, state, pincode } = ad;

    return `${addressLine1}, ${addressLine2}, ${city}, ${state}, ${pincode}`;
  };

  const handleCheckBox = (address) => {
    setCheckedAddress(address);
  };

  if (showLoader) return <Loader />;
  return (
    <>
      <NavBar />
      <Container>
        {addressExists.length > 0 ? (
          <>
            <center>
              <h2>Select a Delivery Address</h2>
            </center>
            <br />
            {addressExists.map((ad) => (
              <React.Fragment key={ad.id}>
                <Form.Check
                  type="checkbox"
                  className="addressFields"
                  label={formattedAddress(ad)}
                  checked={checkedAddress === ad}
                  onChange={() => {
                    handleCheckBox(ad);
                  }}
                  key={ad.addressLine1}
                />
                {checkedAddress === ad && (
                  <>
                    <center>
                      <Button
                        type="submit"
                        variant="success"
                        className="addAddress"
                        id="delivery"
                      >
                        <Link
                          to={{
                            pathname: "/payment",
                            state: {
                              deliveryAddress: checkedAddress,
                              contactnumber: ad.phonenumber,
                            },
                          }}
                          className="paymentLink"
                        >
                          Deliver To This Address
                        </Link>
                      </Button>
                    </center>
                  </>
                )}
                {/* <br key={ad.addressLine2} /> */}
              </React.Fragment>
            ))}
            <br />
            <center>
              <Button
                type="submit"
                variant="primary"
                className="addAddress"
                id="multipleAddress"
                onClick={() => setMultipleAddress(!addMultipleAddress)}
              >
                Add New Address
              </Button>
              {addMultipleAddress && (
                <Row className="itemRow">
                  <AddressForm onSave={handleAddressSave} />
                </Row>
              )}
            </center>
          </>
        ) : (
          <>
            <center>
              <h2>Address</h2>
            </center>
            <br />
            <center>
              <Row className="itemRow">
                <AddressForm onSave={handleAddressSave} />
              </Row>
            </center>
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
