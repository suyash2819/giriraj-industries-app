import React from "react";
import Navbar from "./Header";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../CSS/WomanSection.css";

function Woman() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Lowers</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>T-Shirts</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={require("../images/Man1.jpg")} alt="" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p class="card-text">cost</p>
                <button class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Woman;
