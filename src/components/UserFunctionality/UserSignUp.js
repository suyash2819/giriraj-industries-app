import React, { useState, useEffect } from "react";
import { fire } from "../../config/firebase";
import Navbar from "../Header";
import "../../CSS/AllSection.css";
import AlertMessage from "../AlertMessage";

const UserSignUp = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const createUser = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        var user = fire.auth().currentUser;
        user
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            user
              .sendEmailVerification()
              .then(function () {
                setShowAlert({
                  success: true,
                  message: "Email Verification Sent at the provided Email",
                  show: true,
                });
                setUserName("");
                setUserEmail("");
                setUserPassword("");
              })
              .catch((err) => {
                setShowAlert({
                  success: false,
                  message: err.message,
                  show: true,
                });
              });
          })
          .catch((err) => {
            setShowAlert({
              success: false,
              message: err.message,
              show: true,
            });
          });
      })
      .catch((err) => {
        setShowAlert({
          success: false,
          message: err.message,
          show: true,
        });
      });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Sign Up</h2>
              <div className="card-body py-md-4">
                <form _lpchecked="1">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    ></input>
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    ></input>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <button className="btn btn-primary" onClick={createUser}>
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
