import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import userImg from '../assets/user1.png';
import Footer from "./Footer"

import "./Profile.css";

export default class ProfileFarmer extends Component {
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
            farmSize: "",
            farmAddress: "",
            firmAddress: "",
            crops: "",
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
            const response = await axios.get('http://localhost:2020/farmers/find-user', {
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
              farmSize: response.data.farmSize,
              farmAddress: response.data.farmSize,
              firmAddress: response.data.farmSize,
              crops: response.data.crops,
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
          const response = await axios.delete('http://localhost:2020/farmers/delete-user', {
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
      address,
      town,
      state,
      country,
      farmSize,
      farmAddress,
      crops,
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
          <NavLink to="/login-farmer">
              <button className="ml-2 h2 bg-success text-white">Login</button>
           </NavLink>
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
        <div className="mt-5" >
          <div className="row mb-4">
            <div className="col-2 ">
               <h1 className='text-center text-success'>Welcome</h1> 
            </div>
            <div className="col-xm-3 col-sm-5 col-xl-4">
            <NavLink
               className="h3 text-success font-weight-bold" to="/fleets">See Fleets
             </NavLink> 
             <p className="text-dark h5">Get stream of fleets as fast as possible</p>
            </div>
            <div className="col-6 logout d-flex ">
            {/* <NavLink
               className="text-success font-weight-bold" to="/agents">Contact nearby Agents
             </NavLink>  */}
              <p onClick={this.logout} className="mr-3 text-success">
                <NavLink className="mr-3 text-success" to="/login-farmer">
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
                  <p>{farmAddress}</p>
                  <NavLink
               className="h5 mb-5 text-success font-weight-bold" to="/agents">Contact nearby Agents
             </NavLink> 
               </div>  
            </div> 
          </div>
          {/* <div className="row text-center bg-success">
            <div className="col-12 text-center">
            <p className=" text-white font-weight-bold mt-3 "> Copyright &copy; 2020 | Tractive Nigeria</p>
            </div>
        </div>  */}
          <Footer />
        </div>
        
        
      );
    }
  }

  ProfileFarmer.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }),
  };