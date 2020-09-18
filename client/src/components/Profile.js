import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import "./Profile.css";

export default class Profile extends Component {
  render() {
    return (
        <div className="mt-3" >
          <div className="row mb-4">
            <div className="col-3">
               <h1 className='text-center'>Welcome</h1> 
            </div>
            <div className="col-6"></div>
            <div className="col-3 logout d-flex ">
            <NavLink to="">
                 <p className="h5 mr-4">Logout</p>
            </NavLink>
            <NavLink to="">
               <p className="h5 ">Settings</p>
            </NavLink>
            </div>
          </div>
          <div className="d-flex justify-content-around profile-div">
            <div>
                 <img className="d-block w-10 profile_image" src="images/co-founder.png" alt="Profile" />
            </div>
            <div>
               <p className="h2 font-weight-bold">Boss Johnson</p> 
               <div>
                  <p>johnson.boss@tractech.com</p>
                  <p>08050020012</p>
                  <p>08050020012</p>
                  <p>08050020012</p>
               </div>  
            </div> 
          </div>
        </div>
    );
  }
}