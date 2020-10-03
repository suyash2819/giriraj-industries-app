import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NavBar from "./Header";
import CardDisplay from "./Card";
import { removeFromCart, getData, localToStore, addToCart } from "./reducer";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";

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

  const updateDBFromLocal = (doc) => {
    //To check if the localstorage items exists in db already
    let dbData = doc.data().Cart_Items;
    let localStorageData = JSON.parse(localStorage.getItem("items"));

    localStorageData.forEach((localItem, localIndex) => {
      //TO DO, to implement binary search or something more efficient
      let found = false;
      for (let dbIndex = 0; dbIndex < dbData.length; dbIndex++) {
        if (dbData[dbIndex].id == localItem.id) {
          found = true;
          dbData[dbIndex].item_num += localStorageData[localIndex].item_num;
          break;
        }
      }
      if (!found) {
        dbData.push(localStorageData[localIndex]);
      }
    });
    db.collection("UserCart")
      .doc(props.user.uid)
      .set({
        Cart_Items: dbData,
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
              updateDBFromLocal(doc);
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
                console.log("saved");
                localStorage.clear();
                getFromDb(props.user.uid);
              });
          }
        });
    } else {
      props.localToStore();
    }
  }, []);

  const sendDataToReducer = (dbData) => {
    var payload = {
      data: dbData,
      userstate: props.user,
    };
    props.removeFromCart(payload);
  };

  const removeItem = (el) => {
    if (!!props.user) {
      let dbData = [...props.cartItems];
      dbData.forEach((item, index) => {
        if (item.item_num > 1 && item.id == el.id) {
          item.item_num -= 1;
        } else if (item.id == el.id && item.item_num == 1) {
          dbData.splice(index, 1);
        }
      });
      sendDataToReducer(dbData);

      db.collection("UserCart").doc(props.user.uid).set({
        Cart_Items: dbData,
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
