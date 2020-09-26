import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userSignedIn } from ".././reducer";
import { fire } from "../../config/firebase";
import NavBar from "../Header";
import AlertMessage from "../AlertMessage";
import "../../CSS/AllSection.css";

const RootuserSignIn = (props) => {
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const userNotVerified = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setShowAlert({
          success: false,
          message: "Please Verify your email address and login again",
          show: true,
        });
        props.userSignedIn(null);
        setUserInfo({ userEmail: "", userPassword: "" });
      })
      .catch((err) => {
        setShowAlert({
          success: false,
          message: err.message,
          show: true,
        });
        setUserInfo({ userEmail: "", userPassword: "" });
      });
  };

  const userSignIn = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
      .then((userdata) => {
        props.userSignedIn(userdata);

        if (userdata.user.emailVerified) {
          setShowAlert({
            success: true,
            message: "Signed In Successfully",
            show: true,
          });
          setUserInfo({ userEmail: "", userPassword: "" });
        } else {
          userNotVerified();
        }
      })
      .catch((err) => {
        setShowAlert({
          success: false,
          message: err.message,
          show: true,
        });
        setUserInfo({ userEmail: "", userPassword: "" });
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
                        })
                      }
                    />
                  </Form.Group>
                  <center>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={userSignIn}
                    >
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

const mapStateToProps = (state) => ({
  user: state.userstate.user,
});

const mapDispatchToProps = (dispatch) => ({
  userSignedIn: bindActionCreators(userSignedIn, dispatch),
});

const UserSignIn = connect(mapStateToProps, mapDispatchToProps)(RootuserSignIn);

export default UserSignIn;
