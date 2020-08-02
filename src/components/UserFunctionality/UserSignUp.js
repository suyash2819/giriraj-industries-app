import React, { useState, useEffect } from "react";
import { fire } from "../../config/firebase";
import Navbar from "../Header";
import "../../CSS/AllSection.css";
import AlertMessage from "../AlertMessage";

const UserSignUp = (props) => {
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
  });

  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const createUser = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
      .then(() => {
        var user = fire.auth().currentUser;
        user
          .updateProfile({
            displayName: userInfo.userName,
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
                setUserInfo({ userEmail: "", userPassword: "", userName: "" });
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
                      placeholder="Full Name"
                      value={userInfo.userName}
                      onChange={(e) =>
                        setUserInfo({
                          userEmail: userInfo.userEmail,
                          userPassword: userInfo.userPassword,
                          userName: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={userInfo.userEmail}
                      onChange={(e) =>
                        setUserInfo({
                          userEmail: e.target.value,
                          userPassword: userInfo.userPassword,
                          userName: userInfo.userName,
                        })
                      }
                    ></input>
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={userInfo.userPassword}
                      onChange={(e) =>
                        setUserInfo({
                          userEmail: userInfo.userEmail,
                          userPassword: e.target.value,
                          userName: userInfo.userName,
                        })
                      }
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
