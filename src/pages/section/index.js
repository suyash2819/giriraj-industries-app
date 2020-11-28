import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import * as ItemsService from "../../services/ItemsService";

import NavBar from "../../components/Header";

function Item({ item }) {
  return (
    <Col md={3}>
      <Card>
        <Link
          to={{
            pathname: `/details/${item.Item_Type}/${item.Item_Name}/${item.id}`,
            state: {
              image: item.Image_url,
              element: item,
            },
          }}
        >
          <img src={item.Image_url} alt="" />
        </Link>

        <Card.Body>
          <Card.Title>{item.Item_Name}</Card.Title>
          {item.added && (
            <span className="badge badge-pill badge-primary">Added</span>
          )}
          <Card.Text>{item.Description}</Card.Text>
          <Card.Text style={{ height: "20px" }}>{item.Cost}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Category({ items, label }) {
  return (
    <div>
      <h2>{label}</h2>
      <Row style={{ marginBottom: "10px" }}>
        {items &&
          Object.values(items).map((item) => (
            <Item key={item.id} item={item} />
          ))}
      </Row>
    </div>
  );
}

function SectionItems({ categories }) {
  return (
    <div>
      {Object.entries(categories).map(([category, { items }]) => {
        return <Category key={category} items={items} label={category} />;
      })}
    </div>
  );
}

// TODO: Use Section component directly in Navigation and remove other section components
function Section({ name, title, cartItems }) {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  // Get all the items for this sections
  useEffect(() => {
    ItemsService.getItemsForSection(name).then((_items) => {
      const categories = {};

      // Group the items by Item_Type, and transfrom into a object
      // structure to make lookups easier.
      _items.forEach((item) => {
        if (!categories[item.Item_Type]) {
          categories[item.Item_Type] = { items: {} };
        }

        categories[item.Item_Type].items[item.id] = item;
      });

      setItems(() => categories);
      setLoading(false);
    });
  }, []);

  // When cartItems changes (including inital load), and the data is loaded
  // update the items to add the `added` flag to items that are already added
  useEffect(() => {
    if (loading) {
      return;
    }

    // Using functional state update as we require the latest value of items,
    // but don't want to listen to changes on `items` (Not added `items` in
    // dependency array)
    setItems((_items) => {
      const updated = { ..._items };

      cartItems.forEach((item) => {
        if (updated[item.Item_Type]) {
          updated[item.Item_Type].items[item.id].added = true;
        }
      });

      return updated;
    });
  }, [cartItems, loading]);

  if (loading) {
    return (
      <div>
        <center>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </center>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Container>
        <h1>{title}</h1>
        <SectionItems categories={items} />
      </Container>
    </div>
  );
}

export default Section;
