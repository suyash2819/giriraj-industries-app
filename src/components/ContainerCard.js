import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToCart, getData, localToStore } from "./reducer";
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
            props.getData([]);
          }
        });
    } else {
      props.localToStore();
    }
  }, []);

  const addItem = (doc, item) => {
    let found = false;
    let dbData = [];
    if (doc.exists) {
      dbData = doc.data().Cart_Items;
      for (let i = 0; i < dbData.length; i++) {
        if (dbData[i].id === item.id) {
          dbData[i].item_num += 1;
          found = true;
          break;
        }
      }
      if (!found) {
        item.item_num += 1;
        dbData.push(item);
      }
    } else {
      item.item_num += 1;
      dbData.push(item);
    }
    db.collection("UserCart")
      .doc(props.user.uid)
      .set({
        Cart_Items: dbData,
      })
      .then(() => {
        var payload = {
          data: dbData,
          userstate: props.user,
        };
        props.addToCart(payload);
      });
  };

  const addCart = (item) => {
    if (!!props.user) {
      db.collection("UserCart")
        .doc(props.user.uid)
        .get()
        .then((doc) => {
          addItem(doc, item);
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
                // TODO fetch data from LocalStorage only when USER isn't logged in (taken care with use effecst)
                let localStorageItems =
                  JSON.parse(localStorage.getItem("items")) || [];
                let _cartItems = [...props.cartItems];
                var num = 0;
                let searchFrom = !!_cartItems.length
                  ? _cartItems
                  : localStorageItems;
                if (!!searchFrom.length) {
                  searchFrom.forEach((item, index, searchFrom) => {
                    if (item.id === obj.id) {
                      num = item.item_num;
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
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
});

const ContainerCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerCardComponent);

export default ContainerCard;
