import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Gallery from "react-grid-gallery";
import NavBar from "../components/Header";
import "../CSS/Home.css";
import * as ItemsService from "../services/ItemsService";

const Home = () => {
  let history = useHistory();

  const goToItem = () => {
    // `/details/${item.Item_Type}/${item.Item_Name}/${item.id}`;
    console.log("yes i am being called");

    history.push("/details/T-shirts/blue-tshirt-4039/Ed267DmsLJ8Z9shLBj9Q");

    // return (
    //   <Redirect to="/details/T-shirts/blue-tshirt-4039/Ed267DmsLJ8Z9shLBj9Q" />
    // );
  };

  const IMAGES = [
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2FCovid1.jpg?alt=media&token=97131e23-ecfc-4367-a595-e854fd12ada3",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2FCovid1.jpg?alt=media&token=97131e23-ecfc-4367-a595-e854fd12ada3",
      thumbnailWidth: 100,
      thumbnailHeight: 200,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2FKids1.jpg?alt=media&token=d25e9fc6-96c6-4681-9a50-65de665cb38c",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2FKids1.jpg?alt=media&token=d25e9fc6-96c6-4681-9a50-65de665cb38c",
      thumbnailWidth: 320,
      thumbnailHeight: 400,
    },

    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2Fkeagan-henman-Won79_9oUEk-unsplash.jpg?alt=media&token=76225df1-682c-4918-8c91-8f86472dea67",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2Fkeagan-henman-Won79_9oUEk-unsplash.jpg?alt=media&token=76225df1-682c-4918-8c91-8f86472dea67",
      thumbnailWidth: 220,
      thumbnailHeight: 212,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2FMan1.jpg?alt=media&token=34de6f9c-8333-4e66-a0db-baca84971471",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2FMan1.jpg?alt=media&token=34de6f9c-8333-4e66-a0db-baca84971471",
      thumbnailWidth: 250,
      thumbnailHeight: 200,
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },

    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 220,
      thumbnailHeight: 212,
    },
  ];

  // useEffect = () => {
  //   ItemsService.getItemsForSection("women");
  // };

  return (
    <>
      <NavBar />
      {/* <div className="Woman-pic">
        <h1 className="front-text">WOMEN</h1>
        <button className="front-button">
          <Link to="/women">DISCOVER</Link>
        </button>
      </div>
      <div className="Man-pic">
        <h1 className="front-text">MEN</h1>
        <button className="front-button">
          <Link to="/men">DISCOVER</Link>
        </button>
      </div>
      <div className="Kid-pic">
        <h1 className="front-text">KIDS</h1>
        <button className="front-button">
          <Link to="/kids">DISCOVER</Link>
        </button>
      </div>
      <div className="Covid-pic">
        <h1 className="front-text">COVID</h1>
        <button className="front-button">
          <Link to="/covid">DISCOVER</Link>
        </button>
      </div> */}
      <div className="Man-pic">
        {/* <img
          src={require("../images/Man1_b&w.jpg")}
          alt="bckimg"
          className="imageman"
        /> */}
        <p className="front-text">
          WE'RE GIRIRAJ INDUSTRIES
          <p className="front-text-subhead">YOUR SMILE IS WHAT MATTERS TO US</p>
        </p>
        {/* <button className="front-button"> */}
        <HashLink to="#men" className="front-button">
          <i
            className="fa fa-angle-down bounce"
            style={{ fontSize: "50px", color: "black" }}
          />
        </HashLink>
        {/* </button> */}
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
          <Gallery
            images={IMAGES}
            enableLightbox={false}
            enableImageSelection={true}
            rowHeight={400}
            onSelectImage={goToItem}
          />
        </div>
      </center>
    </>
  );
};
export default Home;
