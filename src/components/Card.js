import React, { useState, useEffect } from "react";

const Card = (props) => {
  const [cartItems, setcartItems] = useState([]);

  const addCart = (element) => {
    setcartItems((cartItems) => [...cartItems, element]);
  };
  //used useEffect to console as useState is also async
  useEffect(() => {
    console.log(cartItems);
  });

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

export default Card;
