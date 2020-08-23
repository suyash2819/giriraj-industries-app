import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { fire } from "../../config/firebase";
import NavBar from "../Header";
import AlertMessage from "../AlertMessage";
import "../../CSS/AllSection.css";

const UserSignUp = () => {
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

  const sendEmailVerification = () => {
    setShowAlert({
      success: null,
      message: null,
      show: false,
    });
    let user = fire.auth().currentUser;
    user
      .updateProfile({
        displayName: userInfo.userName,
      })
      .then(() => {
        user
          .sendEmailVerification()
          .then(() => {
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
            setUserInfo({ userEmail: "", userPassword: "", userName: "" });
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

  const createUser = (e) => {
    e.preventDefault();
    setShowAlert({
      success: null,
      message: null,
      show: false,
    });
    fire
      .auth()
      .createUserWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
      .then(() => {
        sendEmailVerification();
      })
      .catch((err) => {
        setShowAlert({
          success: false,
          message: err.message,
          show: true,
        });
        setUserInfo({ userEmail: "", userPassword: "", userName: "" });
      });
  };

  const alertMessageDisplay = () => {
    setShowAlert({ show: false });
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md="5">
            <Card>
              <center>
                <Card.Title style={{ marginTop: "20px" }}>Sign Up</Card.Title>
              </center>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
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
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={userInfo.userEmail}
                      onChange={(e) =>
                        setUserInfo({
                          userEmail: e.target.value,
                          userPassword: userInfo.userPassword,
                          userName: userInfo.userName,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="password"
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
                    />
                  </Form.Group>
                  <center>
                    <Button variant="primary" onClick={createUser}>
                      Create Account
                    </Button>
                  </center>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="row justify-content-center">
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              alertDisplay={alertMessageDisplay}
            />
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default UserSignUp;
