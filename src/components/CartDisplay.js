import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "firebase";

import NavBar from "./Header";
import CardDisplay from "./Card";
import { removeFromCart } from "./reducer";
import { getData } from "./reducer";

import { localToStore, addToCart } from "./reducer";
import "../CSS/AllSection.css";
import { db } from "../config/firebase";

const CartDisplayComponent = (props) => {
  const getFromDb = (userId) => {
    db.collection("UserCart")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          props.getData(doc.data().Cart_Items);
        } else {
          console.log("No such document!");
        }
      });
  };

  const updateDBFromLocal = () => {
    db.collection("UserCart")
      .doc(props.user.uid)
      .update({
        Cart_Items: firebase.firestore.FieldValue.arrayUnion(
          ...JSON.parse(localStorage.getItem("items"))
        ),
      })
      .then(() => {
        getFromDb(props.user.uid);
        localStorage.clear();
      });
  };

  useEffect(() => {
    if (!!props.user) {
      db.collection("UserCart")
        .doc(props.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (!!localStorage.getItem("items")) {
              updateDBFromLocal();
            } else {
              getFromDb(props.user.uid);
            }
          } else {
            db.collection("UserCart")
              .doc(props.user.uid)
              .set({
                Cart_Items: JSON.parse(localStorage.getItem("items")) || [],
              })
              .then(() => {
                console.log("saved");
                localStorage.clear();
              });
          }
        });
    } else {
      props.localToStore();
    }
  }, []);

  const sendDataToReducer = () => {
    db.collection("UserCart")
      .doc(props.user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          var payload = {
            data: doc.data().Cart_Items,
            userstate: props.user,
          };
          props.removeFromCart(payload);
        }
      });
  };

  const removeItem = (el) => {
    if (!!props.user) {
      db.collection("UserCart")
        .doc(props.user.uid)
        .update({
          Cart_Items: firebase.firestore.FieldValue.arrayRemove(el),
        })
        .then(() => {
          sendDataToReducer();
        });
    } else {
      var payload = {
        data: el,
        userstate: props.user,
      };
      props.removeFromCart(payload);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          {!!props.cartItems.length &&
            props.cartItems.map((obj) => (
              <>
                <CardDisplay
                  key={obj.id}
                  id={obj.id}
                  image={obj.Image_url}
                  itemType={obj.Item_Type}
                  description={obj.Description}
                  cost={obj.Cost}
                  btnText="Remove from Cart"
                  element={obj}
                  onClick={removeItem}
                />
              </>
            ))}
        </Row>
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
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch),
});

const CartDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDisplayComponent);

export default CartDisplay;
