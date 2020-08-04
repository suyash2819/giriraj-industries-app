import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "react-bootstrap";

const CardDisplay = (props) => {
  const {
    id,
    // wrapperClass,
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
    <Col md={3}>
      <Card key={id}>
        <img src={image} alt="" />
        <Card.Body>
          {
            <Card.Title>
              {itemType}

              {!!badgeNum && (
                <span className="badge badge-pill badge-primary">
                  {badgeNum}
                </span>
              )}
            </Card.Title>
          }

          <Card.Text>{description} </Card.Text>
          <Card.Text>{cost} </Card.Text>
          <Button variant="primary" onClick={() => onClick(element) || null}>
            {btnText}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardDisplay;
