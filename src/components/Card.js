import React, { useState, useEffect } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addToCart } from './reducer';

const CardComponent = (props) => {
  const [cartItems, setcartItems] = useState([]);

  const addCart = (element) => {
    let el = [...props.cartItems];
    el.push(element);
    props.addToCart(el)
  };

  const {
    id,
    wrapperClass,
    image,
    itemType,
    description,
    cost,
    btnText,
    element,
  } = props;
  return (
    <div className={wrapperClass || ""}>
      <div className="card" key={id}>
        <img src={image} alt="" />
        <div className="card-body">
          <h5 className="card-title">{itemType}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{cost}</p>
          {!!btnText && (
            <button
              className="btn btn-primary"
              onClick={() => addCart(element)}
            >
              {btnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cartItems,
});

const mapDispatchToProps = dispatch => ({
  addToCart: bindActionCreators(addToCart, dispatch),
});

const Card = connect(mapStateToProps, mapDispatchToProps)(CardComponent)

export default Card;
