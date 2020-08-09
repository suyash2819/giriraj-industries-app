import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { fire } from "../../config/firebase";
import NavBar from "../Header";
import AlertMessage from "../AlertMessage";
import "../../CSS/AllSection.css";

const UserSignIn = () => {
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

  const userSignIn = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
      .then((user) => {
        console.log(user);
        if (user.user.emailVerified) {
          setShowAlert({
            success: true,
            message: "Signed In Successfully",
            show: true,
          });
          setUserInfo({ userEmail: "", userPassword: "", userName: "" });
        } else {
          fire
            .auth()
            .signOut()
            .then(() => {
              setShowAlert({
                success: false,
                message: "Please Verify your email address and login again",
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
        }
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
                <Card.Title style={{ marginTop: "20px" }}>Sign In</Card.Title>
              </center>
              <Card.Body>
                <Form>
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
                    <Button variant="primary" onClick={userSignIn}>
                      Sign In
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

export default UserSignIn;
