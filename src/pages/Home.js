import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Gallery from "react-grid-gallery";
import { Col, Row } from "react-bootstrap";
import NavBar from "../components/Header";
import "../CSS/Home.css";
import * as ItemsService from "../services/ItemsService";

const Home = () => {
  const frontPageItemCollection = "FrontPageItems";
  const [frontPageItems, setFrontPageItems] = useState([]);

  useEffect(() => {
    ItemsService.getItemForFrontPage(frontPageItemCollection)
      .then((items) => {
        setFrontPageItems(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavBar />

      <div className="Man-pic">
        <p className="front-text">
          WE'RE GIRIRAJ INDUSTRIES
          <p className="front-text-subhead">YOUR SMILE IS WHAT MATTERS TO US</p>
        </p>
        <HashLink to="#men" className="front-button">
          <i
            className="fa fa-angle-down bounce"
            style={{ fontSize: "50px", color: "black" }}
          />
        </HashLink>
      </div>
      <span id="men" style={{ display: "hidden" }} />
      <br />
      <br />
      <br />
      <center>
        <Link to="/men" className="sectionlink">
          MEN
        </Link>
        <Link to="/women" className="sectionlink">
          WOMEN
        </Link>
        <Link to="/kids" className="sectionlink">
          KIDS
        </Link>
        <br />
        <br />
        <p>Few Of Our Collections</p>
      </center>
      <center>
        <div
          style={{
            width: "70%",
          }}
        >
          <Row>
            {frontPageItems.slice(0, 3).map((item) => (
              <Col lg={4} md={12}>
                <Link
                  to={{
                    pathname: `/details/${item.Item_Type}/${item.Item_Name}/${item.id}`,
                    state: {
                      image: item.Image_url,
                      element: item,
                    },
                  }}
                  key={item.id}
                >
                  <img
                    src={item.Image_url}
                    alt=""
                    className="w-100 shadow-1-strong rounded mb-4"
                  />
                </Link>
              </Col>
            ))}

            {frontPageItems.slice(3, 6).map((item) => (
              <Col lg={4} className="mb-lg-0">
                <Link
                  to={{
                    pathname: `/details/${item.Item_Type}/${item.Item_Name}/${item.id}`,
                    state: {
                      image: item.Image_url,
                      element: item,
                    },
                  }}
                  key={item.id}
                >
                  <img
                    src={item.Image_url}
                    alt=""
                    className="w-100 shadow-1-strong rounded mb-4"
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </center>
    </>
  );
};
export default Home;
