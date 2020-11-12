import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
import debounce from "lodash.debounce";

const CartDisplayComponent = (props) => {
  const [cartDisplay, setCartDisplay] = useState(true);
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

  const updateStorageWithQuantity = useCallback(
    debounce(
      (cartItems, user) => CartService.updateQuantityOfItem(cartItems, user),
      5000
    ),
    []
  );

  const handleQuantity = (e, item) => {
    e.persist();
    let updatedItems = [...props.cartItems];

    //  Quantity Property used here, if name changes in db make sure to do it here too
    updatedItems.forEach((localItem, localIndex, updatedItems) => {
      if (localItem.CompositeKey === item.CompositeKey) {
        updatedItems[localIndex].Quantity = parseInt(e.target.value);
      }
    });
    const payload = {
      data: updatedItems,
      userstate: props.user,
    };
    props.addToCart(payload);
    updateStorageWithQuantity(updatedItems, props.user);
  };

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
                  cartDisplay={cartDisplay}
                  sizes={obj.Size_Ordered}
                  colors={obj.Color_Ordered}
                  element={obj}
                  itemName={obj.Item_Name}
                  onClick={removeItem}
                  handleQuantity={handleQuantity}
                />
              </>
            ))}
        </Row>
      </Container>
      <br />
      {!!props.cartItems.length && (
        <center>
          <Button
            variant="primary"
            style={{ height: "50px", marginBottom: "20px" }}
          >
            <Link
              to="/checkout"
              className="nav-link"
              style={{ color: "white" }}
            >
              Checkout
            </Link>
          </Button>
        </center>
      )}
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
