import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "firebase";
import { addToCart } from "./reducer";
import CardDisplay from "./Card";
import { db } from "../config/firebase";
import "../CSS/AllSection.css";

const ContainerCardComponent = (props) => {
  let showData = [];
  let _itemTypes = [];
  const { data, btnText } = props;
  data.forEach((element) => {
    let index = _itemTypes.indexOf(element.Item_Type);
    if (index > -1) {
      showData[index].push(element);
    } else {
      showData.push([element]);
      _itemTypes.push(element.Item_Type);
    }
  });

  const addCart = (item) => {
    if (!!props.user) {
      db.collection("UserCart")
        .doc(props.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            db.collection("UserCart")
              .doc(props.user.uid)
              .update({
                Cart_Items: firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                var payload = {
                  data: doc.data().Cart_Items,
                  userstate: props.user,
                };
                props.addToCart(payload);
              });
          } else {
            db.collection("UserCart")
              .doc(props.user.uid)
              .set({
                Cart_Items: item,
              })
              .then(() => {
                var payload = {
                  data: doc.data().Cart_Items,
                  userstate: props.user,
                };
                props.addToCart(payload);
              });
          }
        });
    } else {
      var payload = {
        data: item,
        userstate: props.user,
      };
      props.addToCart(payload);
    }
  };

  if (showData.length === 0) {
    return (
      <Container>
        <center>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </center>
      </Container>
    );
  } else {
    return (
      <>
        {showData.map((el, index) => (
          <Container key={index}>
            <h1>{_itemTypes[index]}</h1>
            <Row>
              {el.map((obj) => {
                // TODO fetch data from LocalStorage only when USER isn't logged in
                let localStorageItems =
                  JSON.parse(localStorage.getItem("items")) || [];
                let _cartItems = [...props.cartItems];
                let num = 0;
                let searchFrom = !!_cartItems.length
                  ? _cartItems
                  : localStorageItems;

                if (!!searchFrom.length) {
                  searchFrom.forEach((item) => {
                    if (item.id === obj.id) {
                      num++;
                    }
                  });
                }
                return (
                  <CardDisplay
                    key={obj.id}
                    id={obj.id}
                    badgeNum={num}
                    image={obj.Image_url}
                    itemType={obj.Item_Type}
                    description={obj.Description}
                    cost={obj.Cost}
                    btnText={btnText}
                    element={obj}
                    onClick={addCart}
                  />
                );
              })}
            </Row>
          </Container>
        ))}
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: bindActionCreators(addToCart, dispatch),
});

const ContainerCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerCardComponent);

export default ContainerCard;
