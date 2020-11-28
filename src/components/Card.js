import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  removeFromCart,
  getData,
  localToStore,
  addToCart,
} from "../store/reducer";

const CardDisplayComponent = (props) => {
  const {
    id,
    image,
    itemType,
    description,
    cost,
    badgeText = null,
    element,
    cartDisplay,
    itemName,
  } = props;

  return (
    <Col md={3}>
      <Card key={id}>
        {!cartDisplay ? (
          <Link
            to={{
              pathname: `/details/${itemType}/${itemName}/${id}`,
              state: {
                image,
                element,
              },
            }}
          >
            <img src={image} alt="" />
          </Link>
        ) : (
          <img src={image} alt="" />
        )}
        <Card.Body>
          <Card.Title>
            {itemName}

            {!!badgeText && (
              <span className="badge badge-pill badge-primary">
                {badgeText}
              </span>
            )}
          </Card.Title>

          <Card.Text>{description} </Card.Text>
          <Card.Text style={{ height: "20px" }}>{cost} </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
  loader: state.loaderstate.loader,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch),
});

const CardDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDisplayComponent);

export default CardDisplay;
