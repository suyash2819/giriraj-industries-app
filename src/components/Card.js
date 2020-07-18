import React, { useState, useEffect } from "react";
import { Badge } from '@material-ui/core';

const Card = (props) => {
  const {
    id,
    wrapperClass,
    image,
    itemType,
    description,
    cost,
    badgeNum = 0,
    onClick,
    btnText,
    element,
  } = props;

  return (
    <div className={wrapperClass || ""}>
      <div className="card" key={id}>
        <img src={image} alt="" />
        <div className="card-body">
          <Badge color="primary" badgeContent={badgeNum}>
            <h5 className="card-title">{itemType}</h5>
          </Badge>
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
