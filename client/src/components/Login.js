import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
// import { NavLink } from "react-router-dom";
import "./Login.css";

export default class Login extends Component {
  render() {
    return (
            <div className="mb-5">
                <div className="mt-5 ">
                    <p className="h2 text-success contact-formHeader font-weight-bold">Login and continue to enjoy our unique services</p>
                </div>
                    <div className="row text-center mt-2">
                        <div className="col-sm-12 col-md-12 col-lg-4"> </div>
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <form className="m-4" id="contact-form" onSubmit={this.onSubmit} method="POST">
                                <p className="mt-5 mb-4 ml-4 text-success mr-4">Input your username and password to login </p>
                                <div className="form-group">
                                    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email Address" />
                                </div>
                                    
                                <div className="form-group">
                                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Passwprd" />
                                </div>
                                    <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 ">Login</button>
                                <div className="form-group mr-5 remember_forgot">
                                    <input type="checkbox" checked="checked" name="remember" placeholder="Remember me"  />
                                    <span className="m-2">Remember me </span>
                                    <span className="ml-5 ">Forgot <a className="text-success" href="/">password?</a></span>
                                </div>
                            </form>
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
}