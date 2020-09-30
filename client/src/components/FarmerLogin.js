import React, { Component } from 'react';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import "./Login.css";

export default class Login extends Component {

    constructor() {
        super();
    
        this.state = {
          email: '',
          password: '',
          loggedIn: false,
          showError: false,
          showNullError: false,
        };
      }
    
      handleChange = name => (event) => {
        this.setState({
          [name]: event.target.value,
        });
      };

      loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (email === '' || password === '') {
          this.setState({
            showError: false,
            showNullError: true,
            loggedIn: false,
          });
        } else {
          try {
            const response = await axios.post('http://localhost:2020/farmers/signin', {
              email,
              password,
            });
            localStorage.setItem('JWT', response.data.token);
            this.setState({
              loggedIn: true,
              showError: false,
              showNullError: false,
            });
          } catch (error) {
            console.error(error.response.data);
            if (
              error.response.data === 'Incorrect Email'
              || error.response.data === 'passwords do not match'
            ) {
              this.setState({
                showError: true,
                showNullError: false,
              });
            }
          }
        }
      }
      
    
  render() {
    const {
        email,
        password,
        showError,
        loggedIn,
        showNullError,
      } = this.state;
      if (!loggedIn) {
        return (
                <div className="mb-5">
                    <div className="mt-5 ">
                        <p className="h2 text-success contact-formHeader font-weight-bold">Login and continue to enjoy our unique services</p>
                    </div>
                        <div className="row text-center mt-2">
                            <div className="col-sm-12 col-md-12 col-lg-4"> </div>
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <form className="m-4" id="contact-form" onSubmit={this.loginUser} >
                                    <p className="mt-5 mb-4 ml-4 text-success mr-4">Input your email and password to login </p>
                                    <div className="form-group">
                                        <input type="email" className="form-control" value={email} onChange={this.handleChange('email')} placeholder="Email Address" />
                                    </div>
                                        
                                    <div className="form-group">
                                        <input type="password" className="form-control" value={password} onChange={this.handleChange('password')} placeholder="Password" />
                                    </div>
                                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 ">Login</button>
                                    <div className="form-group ml-3 remember_forgot">
                                        <input type="checkbox" checked="checked" name="remember" placeholder="Remember me"  />
                                        <span className="m-2">Remember me </span>
                                        <NavLink to="/forgotPassword">
                                              <span className="ml-5 text-success" href="/">Forgot Password?</span>
                                        </NavLink>
                                        
                                    </div>
                                </form>
                                {showNullError && (
                                    <div>
                                    <p className="text-danger font-weight-bold">The email or password cannot be empty.</p>
                                    </div>
                                )}
                                 {showError && (
                                    <div>
                                    <p className="text-danger font-weight-bold">
                                        That email or password isn&apos;t recognized. Please try
                                        again or register now.
                                    </p>
                                    {/* <NavLink to="/join-us">
                                        <button className="ml-2 h2 text-success">Join us</button>
                                    </NavLink>                                */}
                                    </div>
                                )}
                                <hr/>
                            <div>
                                <p className="h3">Dont have an account ?</p>
                                <span className="ml-2 h2"><a className="text-success" href="/join-us">Join us</a></span>
                            </div>
                        </div>
                    <div className="col-sm-12 col-md-12 col-lg-4"> </div>

                </div>

            </div>
        );
      }
      return <Redirect to={`/profile-farmer/${email}`} />;
    }
}