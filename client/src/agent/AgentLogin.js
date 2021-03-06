import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css'
import FlashMessage from 'react-flash-message';
import { MDBContainer, MDBAlert } from 'mdbreact';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import "../components/Login.css";
import FlashState from "../components/FlashState"
// import Navbar from './Navbar';
import Footer from "../components/Footer"

export default class Login extends Component {

    constructor() {
        super();
    
        this.state = {
          email: '',
          password: '',
          loggedIn: false,
          showError: false,
          showNullError: false,
          showMessage: false
        };
         FlashState.set('message', 'Post published');
        this.setState({ published: true });
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
            await axios.post('/agents/signin', {
              email,
              password,
            })
            .then(response=> {
              console.log(response.data.message)
              if(response.data.error){
               M.toast({html: 'Error sending message',classes:"#c62828 red darken-3"})
              } if(response.data.message){
               M.toast({html: response.data.message,classes:"#43a047 green darken-1"})
               M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
               window.location = `/profile-agent/${email}`
              }
              localStorage.setItem('JWT', response.data.token);
              this.setState({
                loggedIn: true,
                showError: false,
                showNullError: false,
                showMessage: false
              })
           })
           
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
      };
    
  render() {
    const {
        email,
        password,
        showError,
        loggedIn,
        showNullError,
        showMessage
      } = this.state;
      if (!loggedIn) {
        return (
                <div className="">
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
                                              <span className="ml-5 text-success" >Forgot Password?</span>
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
                            <div className="mb-3">
                                <p className="h3 mb-3">Dont have an account ?</p>
                                <NavLink to="/join-us">
                                    <button className="btn h2 btn-success btn-large joinbtn">Join us</button>
                                </NavLink> 
                            </div>
                        </div>
                    <div className="col-sm-12 col-md-12 col-lg-4"> </div>

                </div>
                <Footer />
            </div>
        );
      }
     
        return (
          <Redirect
            to={{
              pathname: `/profile-agent/${email}`,
              state: { message: 'Message from other page' }
            }}
          />
        );
      // return <Redirect to={`/profile-agent/${email}`}  />;
          }
    }
