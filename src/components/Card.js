import React, { useState, useEffect } from "react";

const Card = (props) => {
  const {
    id,
    wrapperClass,
    image,
    itemType,
    description,
    cost,
    badgeNum = null,
    onClick,
    btnText,
    element,
  } = props;

  return (
    <div className={wrapperClass || ""}>
      <div className="card" key={id}>
        <img src={image} alt="" />
        <div className="card-body">
          {badgeNum ? (
            <h5 className="card-title">
              {itemType}
              <span className="badge badge-pill badge-primary">{badgeNum}</span>
            </h5>
          ) : (
            <h5 className="card-title">{itemType}</h5>
          )}

          <p className="card-text">{description}</p>
          <p className="card-text">{cost}</p>
          <button
            className="btn btn-primary"
            onClick={() => onClick(element) || null}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
