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

function AddressForm({ onSave }) {
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phonenumber: "",
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
        Add Address
      </Button>
    </Form>
  );
}

const CheckoutComponent = (props) => {
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

  const handleAddressSave = (_address) => {
    const prm = addAddress(props.user.uid, _address);

    prm.then(() => {
      const newAddresses = Array.from(addressExists);

      newAddresses.push(_address);

      setAddressExists(newAddresses);
    });

    return prm;
  };

  const formattedAddress = (ad) => {
    const { addressLine1, addressLine2, city, state, pincode } = ad;

    return `${addressLine1}, ${addressLine2}, ${city}, ${state}, ${pincode}`;
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
