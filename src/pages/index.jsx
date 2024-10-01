import React from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "../LoginForm.css"; // Import the CSS file
import api from "../services/api.js"; // Adjust the path according to your project structure

const LoginForm = ({
  validated,
  signInHandler,
  inputChangeHandler,
  user: { u_email, u_password },
  loginError,
  errorMessage,
}) => {
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={signInHandler}
      className="login-form"
    >
      <h4 className="form-title">Welcome to Smart Parking</h4>
      <Form.Group controlId="signinEmail">
        <Form.Label className="form-label">Email address*</Form.Label>
        <Form.Control
          className="form-control"
          type="email"
          placeholder="Enter email"
          name="u_email"
          value={u_email}
          onChange={inputChangeHandler}
          required
        />
      </Form.Group>

      <Form.Group controlId="signinPassword">
        <Form.Label className="form-label">Password*</Form.Label>
        <Form.Control
          className="form-control"
          type="password"
          placeholder="Password"
          name="u_password"
          value={u_password}
          onChange={inputChangeHandler}
          required
        />
      </Form.Group>

      {loginError ? (
        <div className="error">
          <span>{errorMessage}</span>
        </div>
      ) : null}
      <Button variant="primary" type="submit" className="submit-button">
        Sign In
      </Button>
    </Form>
  );
};

const RegistrationForm = ({
  validated,
  signUpHandler,
  inputChangeHandler,
  user: { u_name, u_email, u_password, u_type },
  registrationError,
  errorMessage,
}) => {
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={signUpHandler}
      className="login-form"
    >
      <h4 className="form-title">Register for Smart Parking</h4>
      <Form.Group controlId="signupName">
        <Form.Label className="form-label">Name*</Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Enter name"
          name="u_name"
          value={u_name}
          onChange={inputChangeHandler}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupEmail">
        <Form.Label className="form-label">Email address*</Form.Label>
        <Form.Control
          className="form-control"
          type="email"
          placeholder="Enter email"
          name="u_email"
          value={u_email}
          onChange={inputChangeHandler}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupPassword">
        <Form.Label className="form-label">Password*</Form.Label>
        <Form.Control
          className="form-control"
          type="password"
          placeholder="Password"
          name="u_password"
          value={u_password}
          onChange={inputChangeHandler}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupType">
        <Form.Label className="form-label">User Type*</Form.Label>
        <Form.Control
          as="select"
          className="form-control"
          name="u_type"
          value={u_type}
          onChange={inputChangeHandler}
          required
        >
          <option value="">Select user type</option>
          <option value="endUser">End User</option>
          <option value="parkingLotOwner">Parking Lot Owner</option>
        </Form.Control>
      </Form.Group>

      {registrationError ? (
        <div className="error">
          <span>{errorMessage}</span>
        </div>
      ) : null}
      <Button variant="primary" type="submit" className="submit-button">
        Register
      </Button>
    </Form>
  );
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      isRegistering: false,
      userDetail: {
        u_id: "",
        u_name: "",
        u_email: "",
        u_password: "",
        u_type: "",
      },
      loginError: false,
      registrationError: false,
      errorMessage: "",
    };
  }

  inputChangeHandler(e) {
    let { name, value } = e.currentTarget;
    let { userDetail: userData } = this.state;
    userData[name] = value;
    this.setState({ userDetail: userData });
  }

  async signInHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      this.setState({ validated: true });
      return false;
    }

    let { u_password: password, u_email: email } = this.state.userDetail;

    try {
      const data = await api.call("post", "login", { email, password });
      console.log(data);
      if (data.success) {
        // Store username and password in localStorage upon successful login
        localStorage.setItem("username", email);
        localStorage.setItem("password", password);
        this.setState({ loginError: false, errorMessage: "" });

        console.log("HERE");
        window.location.pathname = "/dashboard";
      } else {
        this.setState({ loginError: true, errorMessage: data.message });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async signUpHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      this.setState({ validated: true });
      return false;
    }

    let {
      u_name: name,
      u_email: email,
      u_password: password,
      u_type: type,
    } = this.state.userDetail;

    try {
      const data = await api.call("post", "register", {
        name,
        email,
        password,
        type,
      });
      if (data.success) {
        this.setState({ registrationError: false, errorMessage: "" });
        this.setState({ isRegistering: false }); // Go back to sign in form after successful registration
      } else {
        this.setState({
          registrationError: true,
          errorMessage: data.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  toggleForm = () => {
    this.setState({ isRegistering: !this.state.isRegistering });
  };

  render() {
    return (
      <div className="login-container">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" md="6">
              {this.state.isRegistering ? (
                <RegistrationForm
                  validated={this.state.validated}
                  user={this.state.userDetail}
                  registrationError={this.state.registrationError}
                  errorMessage={this.state.errorMessage}
                  inputChangeHandler={this.inputChangeHandler.bind(this)}
                  signUpHandler={this.signUpHandler.bind(this)}
                />
              ) : (
                <LoginForm
                  validated={this.state.validated}
                  user={this.state.userDetail}
                  loginError={this.state.loginError}
                  errorMessage={this.state.errorMessage}
                  inputChangeHandler={this.inputChangeHandler.bind(this)}
                  signInHandler={this.signInHandler.bind(this)}
                />
              )}
              <Button
                variant="link"
                onClick={this.toggleForm}
                className="toggle-button"
              >
                {this.state.isRegistering
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Register"}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Index;
