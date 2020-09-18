import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import "./JoinUsPage.css";

export default class OwnerRegister extends Component {
  render() {
    return (
            <div className="mb-5">
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
                <p className="h1 text-success contact-formHeader font-weight-bold">Get results. Join us today</p>
                <p className="h4 text-success contact-formHeader font-weight-bold">You will never regret it.</p>
            </div>
        <div className="row mt-5">
            <div className="col-sm-12 col-md-12 col-lg-4">
             <NavLink to="/farmer-register">
                      <button className="btn btn-success btn-large joinbtn">Farmers</button>
            </NavLink> 
            <img className="m-3" src="/images/farmyJoin.png" alt="" />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            {/* <NavLink to="/owner-register"> */}
                      <button className="btn btn-success btn-large fleetjoinbtn">Fleet Owners</button>
            {/* </NavLink>  */}
            <form className="m-4" id="contact-form" onSubmit={this.onSubmit} method="POST">
                        <select required className='form-group form-control' > 
                            <option>Select Title</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Alh.</option>
                            <option>Miss.</option>
                            <option>Dr.</option>
                            <option>Prof.</option>
                            <option>Chief</option>
                            <option>Prince</option>
                            <option>Others</option>
                        </select>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Full Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email Address" />
                        </div>
                        <select required className='form-group form-control' > 
                            <option>Select Gender</option>
                            <option>male</option>
                            <option>female</option>
                            <option>others</option>
                        </select>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Phone Number" />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="2" placeholder="Address"></textarea>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Town" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="State" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Country" />
                        </div>
                        <select required className='form-group form-control' > 
                            <option>Select Your Role</option>
                            <option>Owner</option>
                            <option>Manager</option>
                            <option>CEO</option>
                            <option>others</option>
                        </select>
                        <div className="form-group">
                             <textarea className="form-control" rows="2" placeholder="Firm Address"></textarea>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Passwprd" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 mr-5">Register</button>
                    </form>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            <NavLink to="/agent-register">
                      <button className="btn btn-success btn-large joinbtn">Agents</button>
            </NavLink> 
                    <img className="m-3" src="/images/youthJoin.png" alt="" />
            </div>

        </div>


        </div>
    );
  }
}