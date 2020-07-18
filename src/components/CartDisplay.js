import React from "react";
import Navbar from "./Header";
import Card from './Card';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeFromCart } from "./reducer";
import "../CSS/AllSection.css";

const CartDisplayComponent = (props) => {
  // TODO fetch data from LocalStorage only when USER isn't logged in
  let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
  let _cartItems = [...props.cartItems];
  let showData = !!_cartItems.length ? _cartItems : localStorageItems;

  const removeItem = (el) => {
    props.removeFromCart(el)
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {!!showData.length && showData.map((obj) => (
            <>
              <Card
                id={obj.id}
                wrapperClass="col-md-3"
                image={obj.Image_url}
                itemType={obj.Item_Type}
                description={obj.Description}
                cost={obj.Cost}
                btnText='Remove from Cart'
                element={obj}
                onClick={removeItem}
              />
            </>
          ))
          }
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
});

const CartDisplay = connect(mapStateToProps, mapDispatchToProps)(CartDisplayComponent);

export default CartDisplay;
