import React, { Component } from "react";
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      login: "",
      password: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
      const {
          name,
          login,
          password
      } = this.state;

    axios.post("http://localhost:5000/api/registration", {
        name: name,
        login: login,
        password: password
    }).then(response => {
        console.log("reg response", response);
    }).catch(err => {
        console.log("Error: " + err);
        
    })
    event.preventDefault();
  }

  render() {
    return (
      <form className="form" autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="form__group">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form__input"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </div>
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
          Register
        </button>
      </form>
    );
  }
}
