import React, { useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToCart, getData, localToStore } from "../store/reducer";
import CardDisplay from "./Card";
import "../CSS/AllSection.css";

const ContainerCardComponent = (props) => {
  const [cartDisplay] = useState(false);

  let showData = [];
  let _itemTypes = [];
  const { data } = props;

  data.forEach((element) => {
    let index = _itemTypes.indexOf(element.Item_Type);
    if (index > -1) {
      showData[index].push(element);
    } else {
      showData.push([element]);
      _itemTypes.push(element.Item_Type);
    }
  });

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
        <Container key={index}>
          <h1>{_itemTypes[index]}</h1>
          <Row style={{ marginBottom: "10px" }}>
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
                  element={obj}
                  itemName={obj.Item_Name}
                  cartDisplay={cartDisplay}
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
