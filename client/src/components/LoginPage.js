import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import "./JoinUsPage.css";
// import Navbar from './Navbar';
import Footer from "./Footer"
import AuthenticatedRoute from "../App"
import FlashMessage from 'react-flash-message';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
  
      this.state = {
        message: false,
        }
      }
      
      componentDidMount() {
        if (AuthenticatedRoute) {
          this.setState({ message: true })
        //   window.location = '/join-us'
        }
      }

  render() {
//     const {
//         message
//   } = this.state

//   if (message) {
//     return (
//          <div className="mt-5">
//                <div className="mt-5" >
//             {/* <FlashMessage duration={10000}> */}
//                 <strong className="text-danger h4">Please sign in or register, Thanks!</strong>
//             {/* </FlashMessage> */}
//             </div>
//           <div className="mt-5">
//               <NavLink
//                 className="h5 btn btn-success  text-white font-weight-bold" to="/login">Login
//               </NavLink> 
          
//               <NavLink
//                 className="h5 ml-4 btn btn-success  text-white font-weight-bold" to="/join-us">Register
//               </NavLink> 
//           </div>
//          </div>
      
//     );
//   }
    return (
            <div className="">
            {/* <section className="hero_contact">
            <div className="container-fluid">
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-white font-weight-bold mt-5">
                <h1 className="mt-5 display-3"> Will you like to be part of what we do?</h1>
                    <h3 className="display-2 text-success mt-5">Join Us</h3> 
                </div>
                </div>
            </div>
            </section> */}
            <div className="mt-5 ">
                <p className="h1 text-success contact-formHeader font-weight-bold">Login and continue to enjoy our unique services</p>
            </div>
        <div className="row mt-5">
            <div className="col-sm-12 col-md-12 col-lg-4">
             <NavLink to="/login-farmer">
                      <button className="btn btn-success btn-large joinbtn">Farmers</button>
            </NavLink> 
            <img className="m-3" src="/images/farmyJoin.png" alt="" />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            <NavLink to="/login-owner">
                      <button className="btn btn-success btn-large fleetjoinbtn">Fleet Owners</button>
            </NavLink> 
            <img className="m-3" src="/images/tractyJoin.png" alt="" />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            <NavLink to="/login-agent">
                      <button className="btn btn-success btn-large joinbtn">Agents</button>
            </NavLink> 
                    <img className="m-3" src="/images/youthJoin.png" alt="" />
            </div>
        </div>
        <hr/>
        <div className="mb-5">
           <p className="h2 mb-3 text-success">Dont have an account ?</p>
           <NavLink to="/join-us">
                      <button className="btn h2 btn-success btn-large joinbtn">Join us</button>
            </NavLink> 
        </div>

        <Footer />
    </div>
    );
  }
}