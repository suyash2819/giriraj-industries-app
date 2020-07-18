import React from 'react';
import Card from './Card';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToCart } from "./reducer";
import '../CSS/AllSection.css';

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
  
  const addCart = (item) =>{
    props.addToCart(item);
  }

  if (showData.length === 0) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {

    return (
      <>
        {showData.map((el, index) => (
          <div className="container" key={index}>
            <h1>{_itemTypes[index]}</h1>
            <div className="row">
              {el.map((obj) => {
                // TODO fetch data from LocalStorage only when USER isn't logged in
                let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
                let _cartItems = [...props.cartItems];
                let num = 0;
                let searchFrom = !!_cartItems.length ? _cartItems : localStorageItems;

                if (!!searchFrom.length) {
                  searchFrom.forEach((item) => {
                    if (item.id === obj.id) {
                      num++;
                    }
                  })
                }
                return (
                  <Card
                    key={obj.id}
                    id={obj.id}
                    badgeNum={num}
                    wrapperClass="col-md-3"
                    image={obj.Image_url}
                    itemType={obj.Item_Type}
                    description={obj.Description}
                    cost={obj.Cost}
                    btnText={btnText}
                    element={obj}
                    onClick={addCart}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </>
    );
  }
};


const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: bindActionCreators(addToCart, dispatch),
});

const ContainerCard = connect(mapStateToProps, mapDispatchToProps)(ContainerCardComponent);

export default ContainerCard;
