import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NavBar from "./Header";
import CardDisplay from "./Card";
import {
  removeFromCart,
  getData,
  localToStore,
  addToCart,
} from "../store/reducer";
import { db } from "../config/firebase";
import getFromDb from "./Utils";
import * as CartService from "../services/CartService";
import "../CSS/AllSection.css";

const CartDisplayComponent = (props) => {
  useEffect(() => {
    if (!!props.user) {
      db.collection("UserCart")
        .doc(props.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (!!localStorage.getItem("items")) {
              CartService.syncDBFromLocal(doc, props.user.uid)
                .then((updateddata) => {
                  localStorage.clear();
                  props.getData(updateddata);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              props.getData(doc.data().Cart_Items);
            }
          } else {
            db.collection("UserCart")
              .doc(props.user.uid)
              .set({
                Cart_Items: JSON.parse(localStorage.getItem("items")) || [],
              })
              .then(() => {
                localStorage.clear();
                getFromDb(props.user.uid).then((datadoc) => {
                  props.getData(datadoc);
                });
              });
          }
        });
    } else {
      props.localToStore();
    }
  }, []);

  const removeItem = (el) => {
    CartService.removeItem(props.user, el, [...props.cartItems])
      .then((updatedData) => {
        const payload = {
          data: updatedData,
          userstate: props.user,
        };
        props.removeFromCart(payload);
      })
      .catch(console.error);
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
                  badgeNum={obj.item_num}
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
