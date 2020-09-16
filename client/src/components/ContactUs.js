import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import "./ContactUs.css";

export default class ContactUs extends Component {
  render() {
    return (
            <div className="mb-5">
            <section className="hero_contact">
            <div className="container-fluid">
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-white font-weight-bold mt-5">
                <h1 className="mt-5 display-3"> Do you have anything for us?</h1>
                    <h3 className="display-2 text-success mt-5">Contact Us</h3> 
                </div>
                </div>
            </div>
            </section>
            <div className="mt-5 contact-formHeader">
                <p className="h3 text-success">Get results. contact us today:</p>
                <p className="h5 text-success">Your comfort matters to us .</p>
            </div>
            <div className="container mt-5">
                <div className="row">
                <div className="col-1"> </div>
                    <div className="col-sm-12 col-md-12 col-lg-5 mr-5 contact">
                        <p className="h5 mt-5 mb-4 ml-4">Fill out the form below to get started:</p>
                    <form className="m-4" id="contact-form" onSubmit={this.onSubmit} method="POST">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email Address" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Subject" />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="4" placeholder="Enter your message"></textarea>
                        </div>
                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 mr-5">Contact us</button>
                    </form>
                 </div>
            
                    <div className="col-sm-12 col-md-12 col-lg-5 contact">
                        <div className="m-4">
                        <p className="h4 mb-3 mt-5">General Enquiries</p>
                        <p className=""> Have a Question, Enquiry, or Suggestion, Kindly get in touch</p>
                        <p className="text-success font-weight-bold">info@tractive.com</p>
                        <p className="text-success font-weight-bold">+2348098858875</p>
                        <div>
                            <br/>
                           <p className="h5">Our Location</p> 
                           <p className="mb-1">65 Herbert Macaulay Way, Yaba 101212, Lagos.</p>
                           <NavLink 
                                className="text-success font-weight-bold" activeClassName="is-active" to="">GET DIRECTION
                            </NavLink> 
                             <br/>
                            <p className="h5 mt-5">Our Newsletter</p>
                            <p className="mb-1">Exclusive offers and discounts</p>
                            <NavLink 
                                className="text-success font-weight-bold" activeClassName="is-active" to="">SIGN UP HERE
                             </NavLink> 
                        </div>
                    </div>
                   </div>
                </div>
            </div>
        </div>
    );
  }
}