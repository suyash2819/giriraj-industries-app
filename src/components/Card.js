import React from "react";
import { Card, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const CardDisplay = (props) => {
  const {
    id,
    image,
    itemType,
    description,
    cost,
    badgeText = null,
    onClick,
    sizes,
    colors,
    btnText,
    handleQuantity,
    element,
    cartDisplay,
    itemName,
    // debounce,
  } = props;
  // console.log(handleQuantity);
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
            className=""
          >
            <img src={image} alt="" />
          </Link>
        ) : (
          <img src={image} alt="" />
        )}
        <Card.Body>
          <Card.Title>
            {itemType}

            {!!badgeText && (
              <span className="badge badge-pill badge-primary">
                {badgeText}
              </span>
            )}
          </Card.Title>

          <Card.Text>{description} </Card.Text>
          <Card.Text style={{ height: "20px" }}>{cost} </Card.Text>
          {!cartDisplay && (
            <Form.Group controlId="formGridState">
              <Form.Label>Size</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                style={{
                  width: "100px",
                  display: "inline",
                  marginLeft: "10px",
                }}
                // onChange={(e) => handleSize(e)}
              >
                <option>Choose...</option>
                {Object.keys(sizes).map(
                  (size, i) => !!sizes[size] && <option>{size}</option>
                )}
              </Form.Control>
            </Form.Group>
          )}
          {!cartDisplay && (
            <Form.Group controlId="formGridState">
              <Form.Label>Color</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                style={{
                  width: "100px",
                  display: "inline",
                  marginLeft: "10px",
                }}
                // onChange={(e) => handleColor(e)}
              >
                <option>Choose...</option>
                {Object.keys(colors).map(
                  (color, i) => !!colors[color] && <option> {color} </option>
                )}
              </Form.Control>
            </Form.Group>
          )}
          {!!cartDisplay && (
            <>
              <Card.Text style={{ height: "20px" }}>Size: {sizes}</Card.Text>
              <Card.Text style={{ height: "20px" }}>Color: {colors}</Card.Text>
              <Form.Group controlId="quantityl">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  style={{ width: "80px", float: "right", height: "35px" }}
                  min="1"
                  value={element.Quantity || ""}
                  onChange={(e) => handleQuantity(e, element)}
                />
              </Form.Group>
            </>
          )}
          <Button variant="primary" onClick={() => onClick(element) || null}>
            {btnText}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardDisplay;
