import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      loginErrors: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { login, password } = this.state;
    const user = {login, password};
    this.props.loginUser(user);
  };

  render() {
    return (
      <form className="form" autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="form__group">
          <label htmlFor="login" className="form__label">
            Login
          </label>
          <input
            type="text"
            name="login"
            placeholder="Login"
            className="form__input"
            value={this.state.login}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="******"
            className="form__input"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>
        <button type="submit" className="form__button">
          Login
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { loginUser })(Login);
