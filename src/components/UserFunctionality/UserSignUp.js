import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { fire } from "../../config/firebase";
import Navbar from "../Header";
// import AlertMessage from "../AlertMessage";
import func from "../AlertMessage";
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
    // setShowAlert({
    //   success: null,
    //   message: null,
    //   show: false,
    // });
    let user = fire.auth().currentUser;
    user
      .updateProfile({
        displayName: userInfo.userName,
      })
      .then(() => {
        user
          .sendEmailVerification()
          .then(() => {
            func(true, "Email Verification Sent at the provided Email");

            // setShowAlert({
            //   success: true,
            //   message: "Email Verification Sent at the provided Email",
            //   show: true,
            // });
            setUserInfo({ userEmail: "", userPassword: "", userName: "" });
            console.log(showAlert);
          })
          .catch((err) => {
            console.log(showAlert);
            func(false, err.message);

            // setShowAlert({
            //   success: false,
            //   message: err.message,
            //   show: true,
            // });
            setUserInfo({ userEmail: "", userPassword: "", userName: "" });
          });
      })
      .catch((err) => {
        console.log(showAlert);
        func(false, err.message);

        // setShowAlert({
        //   success: false,
        //   message: err.message,
        //   show: true,
        // });
      });
  };

  const createUser = (e) => {
    e.preventDefault();
    // setShowAlert({
    //   success: null,
    //   message: null,
    //   show: false,
    // });
    fire
      .auth()
      .createUserWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
      .then(() => {
        sendEmailVerification();
      })
      .catch((err) => {
        console.log(showAlert);
        console.log(func);
        let s = func(false, err.message);
        console.log(s);
        // setShowAlert({
        //   success: false,
        //   message: err.message,
        //   show: true,
        // });
        setUserInfo({ userEmail: "", userPassword: "", userName: "" });
      });
  };

  //   const AlertMessageDisplay = () => {
  //     setShowAlert({ show: false });
  //   };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md="5">
            <Card>
              <center>
                <Card.Title>Sign Up</Card.Title>
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
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <Button variant="primary" onClick={createUser}>
                      Create Account
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <div className="row justify-content-center">
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              func={AlertMessageDisplay}
            />
          ) : null}
        </div> */}
      </Container>
    </>
  );
};

export default UserSignUp;
