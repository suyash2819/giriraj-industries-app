import React from "react";

const Card = (props) => {
  const {
    id,
    wrapperClass,
    image,
    itemType,
    description,
    cost,
    btnText,
  } = props;
  return (
    <div className={wrapperClass || ""} key={id}>
      <div className="card">
        <img src={image} alt="" />
        <div className="card-body">
          <h5 className="card-title">{itemType}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{cost}</p>
          {!!btnText && <button className="btn btn-primary">{btnText}</button>}
        </div>
      </div>
    </div>
  );
};

export default Card;
