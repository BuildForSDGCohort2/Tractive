import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import userImg from '../assets/user1.png';
import Footer from "./Footer"

import "./Profile.css";

export default class ProfileAgent extends Component {
      constructor() {
        super();

        this.state = {
           title: "",
            fullName: "",
            gender: '',
            email: "",
            phone: "",
            address: "",
            town: "",
            state: "",
            country: "",
            education: "",
            employmentStatus: "", 
            cvLink: "", 
            password: "", 
            isLoading: true,
            deleted: false,
            error: false,
        };
      }

      async componentDidMount() {
        const accessString = localStorage.getItem('JWT');
        const {
          match: {
            params: { email },
          },
        } = this.props;
        console.log(email);
        if (accessString == null) {
          this.setState({
            isLoading: false,
            error: true,
          });
        } else {
          try {
            const response = await axios.get('/agents/find-user', {
              params: {
                email,
              },
              headers: { Authorization: `JWT ${accessString}` },
            });
            this.setState({
              title: response.data.title,
              fullName: response.data.fullName,
              gender: response.data.gender,
              email: response.data.email,
              phone: response.data.phone,
              address: response.data.address,
              town: response.data.town,
              state: response.data.state,
              country: response.data.country,
              education: response.data.education,
              employmentStatus: response.data.employmentStatus, 
              cvLink: response.data.cvLink, 
              password: response.data.password,
              isLoading: false,
              error: false,
            });
          } catch (error) {
            console.error(error.response.data);
            this.setState({
              error: true,
            });
          } 
        } 
      }

      deleteUser = async (e) => {
        const accessString = localStorage.getItem('JWT');
        const {
          match: {
            params: { email },
          },
        } = this.props;
        if (accessString === null) {
          this.setState({
            isLoading: false,
            error: true,
          });
        }
    
        e.preventDefault();
        try {
          const response = await axios.delete('/agents/delete-user', {
            params: {
              email,
            },
            headers: { Authorization: `JWT ${accessString}` },
          });
          console.log(response.data);
          localStorage.removeItem('JWT');
          this.setState({
            deleted: true,
          });
        } catch (error) {
          console.error(error.response.data);
          this.setState({
            error: true,
          });
        }
      };
    
      logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('JWT');
      };


  render() {
    const {
      title,
      fullName,
      gender,
      email,
      phone,
      education,
      employmentStatus, 
      cvLink, 
      address,
      town,
      state,
      country,
      password, 
      isLoading,
      deleted,
      error,
    } = this.state;

    if (error) {
      return (
        <div>
          <div className="mt-5">
           <h5>Problem fetching user data. Please login again.</h5> 
          </div>
          <NavLink to="/login-agent">
              <button className="ml-2 h2 bg-success text-white">Login</button>
           </NavLink>
           <br/>
           <br/>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="text-success">Loading User Data...</div>
        
      );
    }
    if (deleted) {
      return <Redirect to="/" />;
    }

    return (
        <div className="mt-5 " >
          <div className="row mb-4">
            <div className="col-3">
               <h1 className='text-center text-success'>Welcome</h1> 
            </div>
            <div className="col-xm-3 col-sm-5 col-xg-5">
            <NavLink
               className="text-success h3 font-weight-bold" to="/fleets">See Fleets
             </NavLink> 
             <p className="text-dark h5">Help as many farmers and as many fleet owners get access to each other</p>
            </div>
            <div className="col-3 logout d-flex ">
            
              <p onClick={this.logout} className="mr-3 text-success">
                <NavLink className="mr-3 text-success" to="/login-agent">
                    Logout
                </NavLink>
              </p>
  
              <NavLink to={`/updateProfile/${email}`}>
                <p className="ml-3 text-success">Update Profile</p>
              </NavLink>
              <NavLink to={`/updatePassword/${email}`}
              >
                <p className="ml-3 text-success">Update Password</p>
              </NavLink>
            </div>
          </div>
          <div className="d-flex mb-5 justify-content-around profile-div">
            <div>
                 <img className="img-thumbnail profile_image" src={userImg} alt="user"/><br/>
               <form>
                 <div>
                  <label className="mr-4">Upload profile picture</label>
                <div>
                <input 
                className="ml-5"
                    type="file" 
                    name="" 
                    onChange={this.onChangeImage}
                    />
                </div>
                 </div>
              
               </form>
            </div>
            <div>
               <p className="h2 font-weight-bold"> <span className="mr-3">{title}</span> {fullName}</p> 
               <div>
                  <p>{email}</p>
                  <p>{phone}</p>
                  <p>{address}</p>
               </div>  
            </div> 
          </div>
          <Footer />
        </div>
      );
    }
  }

  ProfileAgent.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }),
  };