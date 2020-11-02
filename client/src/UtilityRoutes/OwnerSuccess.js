import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
// import "./JoinUsPage.css";
// import Navbar from './Navbar';
import messageFromServerOwner from '../owner/OwnerRegister'

import { Redirect } from 'react-router-dom';

export default class OwnerSuccess extends Component {
    constructor(props) {
        super(props);
  
      this.state = {
        messageOwner: false,
        }
      }
      
    //   componentDidMount = () => {
    //     this.routes();
    //   };
    
    // routes = () => {
    //    if (AuthenticatedRoute) {
    //     this.setState({ message: true })
    //    } else if (messageFromServerFarmer ) {
    //     this.setState({ messageFarmer: true })
    //    }else if (messageFromServerAgent) {
    //     this.setState({ messageAgent: true })
    //    }        
    //     else if (messageFromServerOwner) {
    //       this.setState({ messageOwner: true })
    //     }
    //   }

  render() {
  if(messageFromServerOwner){
    return(
      <>
      <div className="mt-5">
        {/* <FlashMessage duration={10000}> */}
            <strong className="text-danger h4">Congratulation, You have successfully registered!</strong>
        {/* </FlashMessage> */}
      </div>
      {/* <Redirect to="login-farmer" />; */}
      <NavLink to="/login-owner">
            <button className="btn btn-lg btn-success contactbtn mb-2 ">Login</button>
        </NavLink>
      </>
    )
  } 
 
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
    </div>
    );
  }
}