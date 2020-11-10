import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToCart, getData, localToStore } from "../store/reducer";
import CardDisplay from "./Card";
import { db } from "../config/firebase";
import getFromDb from "./Utils";
import * as CartService from "../services/CartService";
import "../CSS/AllSection.css";

const ContainerCardComponent = (props) => {
  const [cartDisplay, setCartDisplay] = useState(false);

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

  // const addCart = (item) => {
  //   let itemOrdered = { ...item };
  //   delete itemOrdered.Sizes_Available;
  //   delete itemOrdered.Color_Available;
  //   itemOrdered.Size_Ordered = size;
  //   // itemOrdered.Size_Ordered[size] = true;
  //   itemOrdered.Color_Ordered = color;
  //   // itemOrdered.Color_Ordered[color] = true;
  //   console.log(item, " ", itemOrdered);
  //   CartService.addItem(props.user, itemOrdered)
  //     .then((updatedItems) => {
  //       const payload = {
  //         data: updatedItems,
  //         userstate: props.user,
  //       };
  //       props.addToCart(payload);
  //     })
  //     .catch(console.error);
  // };

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
  }

  return (
    <>
      {showData.map((el, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Container key={index}>
          <h1>{_itemTypes[index]}</h1>
          <Row>
            {el.map((obj) => {
              let _cartItems = [...props.cartItems];
              let localStorageItems =
                JSON.parse(localStorage.getItem("items")) || [];

              let text = null;
              let searchFrom = !!_cartItems.length
                ? _cartItems
                : localStorageItems;
              if (!!searchFrom.length) {
                searchFrom.forEach((item) => {
                  if (item.id === obj.id) {
                    text = "added to cart";
                  }
                });
              }

              return (
                <CardDisplay
                  key={obj.id}
                  id={obj.id}
                  badgeText={text}
                  image={obj.Image_url}
                  itemType={obj.Item_Type}
                  description={obj.Description}
                  cost={obj.Cost}
                  sizes={obj.Sizes_Available}
                  colors={obj.Color_Available}
                  btnText={btnText}
                  element={obj}
                  itemName={obj.Item_Name}
                  cartDisplay={cartDisplay}
                  // onClick={() => addCart(obj)}
                />
              );
            })}
          </Row>
        </Container>
      ))}
    </>
  );
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
