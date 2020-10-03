import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar';


export default class ForgotPassword extends Component {

    constructor() {
        super();
    
        this.state = {
          email: '',
          showError: false,
          messageFromServer: '',
          showNullError: false,
        };
      }
    
      handleChange = name => (event) => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
      sendEmail = async (e) => {
        e.preventDefault();
        const { email } = this.state;
        if (email === '') {
          this.setState({
            showError: false,
            messageFromServer: '',
            showNullError: true,
          });
        } else {
          try {
            const response = await axios.post(
              '/farmers/forgot-password',
              {
                email,
              },
            );
            console.log(response.data);
            if (response.data === 'recovery email sent') {
              this.setState({
                showError: false,
                messageFromServer: 'recovery email sent',
                showNullError: false,
              });
            }
          } catch (error) {
            console.error(error.response.data);
            if (error.response.data === 'email not in db') {
              this.setState({
                showError: true,
                messageFromServer: '',
                showNullError: false,
              });
            }
          }
        }
      };
    
      render() {
        const {
     email, messageFromServer, showNullError, showError 
    } = this.state;
    
        return (
          <div >
            <form className="m-5" id="contact-form" onSubmit={this.sendEmail}>
                <div className="form-group">
                    <input type="email" className="form-control" value={email}  onChange={this.handleChange('email')} placeholder="Email Address" />
                </div>
               <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 ">Send Password Reset Email</button>
            </form>
            {showNullError && (
              <div>
                <p className="text-danger">The email address cannot be empty</p>
              </div>
            )}
            {showError && (
              <div>
                <p className="text-danger">
                  That email address isn&apos;t recognized. Please try again or
                  register for a new account.
                </p>
                <div className="mb-5">
                <p className="h2 mb-3 text-success">Dont have an account ?</p>
                <NavLink to="/join-us">
                            <button className="btn h2 btn-success btn-large joinbtn">Join us</button>
                  </NavLink> 
              </div>
              </div>
            )}
            {messageFromServer === 'recovery email sent' && (
              <div>
                <h3 className="text-success">Password Reset Email Successfully Sent!</h3>
              </div>
            )}
          </div>
        );
      }


}