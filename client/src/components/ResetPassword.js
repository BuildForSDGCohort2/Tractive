import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import Navbar from './Navbar';

export default class ResetPassword extends Component {

    constructor() {
        super();
    
        this.state = {
          email: '',
          password: '',
          updated: false,
          isLoading: true,
          error: false,
        };
      }
    
      async componentDidMount() {
        const {
          match: {
            params: { token },
          },
        } = this.props;
        try {
          const response = await axios.get('http://localhost:2020/farmers/reset', {
            params: {
              resetPasswordToken: token,
            },
          });
          console.log(response);
          if (response.data.message === 'password reset link sent!') {
            this.setState({
              email: response.data.email,
              updated: false,
              isLoading: false,
              error: false,
            });
          }
        } catch (error) {
          console.log(error.response.data);
          this.setState({
            updated: false,
            isLoading: false,
            error: true,
          });
        }
      }
    
      handleChange = name => (event) => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
      updatePassword = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const {
          match: {
            params: { token },
          },
        } = this.props;
        try {
          const response = await axios.put(
            'http://localhost:2020/farmers/update-password-via-email',
            {
              email,
              password,
              resetPasswordToken: token,
            },
          );
          console.log(response.data);
          if (response.data.message === 'password updated') {
            this.setState({
              updated: true,
              error: false,
            });
          } else {
            this.setState({
              updated: false,
              error: true,
            });
          }
        } catch (error) {
          console.log(error.response.data);
        }
      };
    
      render() {
        const {
     password, error, isLoading, updated 
    } = this.state;
    
        if (error) {
          return (
            <div>
              <div className="m-5">
                <h4 className="text-danger mb-5">Problem resetting password. Please send another reset link.</h4>
                <NavLink to="/forgot-password">
                              <button className="btn h2 btn-success btn-large joinbtn">Forgot Password</button>
                    </NavLink> 
              </div>
            </div>
          );
        }
        if (isLoading) {
          return (
            <div>
              <div className="h3 font-weigh-bold text-success">Loading User Data...</div>
            </div>
          );
        }
        return (
          <div>
            <form className="password-form" onSubmit={this.updatePassword}>
            <div className="form-group">
                    <input type="password" className="form-control" value={password} onChange={this.handleChange('password')} />
                </div>
               <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 ">Update Password</button>
            </form>
    
            {updated && (
              <div>
                <p className="text-success">
                  Your password has been successfully reset, please try logging in
                  again.
                </p>
               
                  <NavLink to="/login-farmer">
                              <button className="btn h2 btn-success btn-large joinbtn">Login</button>
                    </NavLink> 
              </div>
            )}
          </div>
        );
      }
    }
    
    ResetPassword.propTypes = {
      // eslint-disable-next-line react/require-default-props
      match: PropTypes.shape({
        params: PropTypes.shape({
          token: PropTypes.string.isRequired,
        }),
      }),


}