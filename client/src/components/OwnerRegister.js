import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "./JoinUsPage.css";
import Footer from "./Footer"

export default class OwnerRegister extends Component {
    constructor(props) {
        super(props);
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
            firmName: "",
            firmAddress: "",
            role: "",
            password: "", 
            messageFromServer: '',
            showError: false,
            registerError: false,
            loginError: false
        
        };
    }

    handleChange = owner => (event) => {
        this.setState({
          [owner]: event.target.value,
        });
      };

    registerOwner = async (e) => {
        e.preventDefault(); 
        const {
            title, address, town, state, firmName, firmAddress, role, fullName, gender, email, phone,  country, password,
        } = this.state; 
            if(email === "" || password === ""){
                this.setState({
                    showError: true,
                    loginError: false,
                    registerError: true
                });
            } else {
                try {
                    const response = await axios.post(
                      '/owners/signup',
                      {
                        title, address, town, state,  role, fullName, gender, email, phone,  country, firmName, firmAddress, password,
                      },
                    );
                    window.location = '/login-owner';
                    this.setState({
                        messageFromServer: response.data.message,
                        showError: false,
                        loginError: false,
                        registerError: false,
                      });
                    } catch (error) {
                        console.error(error.response.data);
                        if (error.response.data === 'email already taken') {
                          this.setState({
                            showError: true,
                            loginError: true,
                         registerError: false,
                });
        }
    }
  }
    
} 

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
        role,
        firmName,
        firmAddress,
        password, 
        messageFromServer,
        showError,
        registerError,
        loginError,
      } = this.state;

    if (messageFromServer === '') {
    return (
            <div className="">
            <div className="mt-5 ">
                <p className="h1 text-success contact-formHeader font-weight-bold">Get results. Join us today</p>
                <p className="h4 text-success contact-formHeader font-weight-bold">You will never regret it.</p>
            </div>
        <div className="row mt-5">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
             <NavLink to="/farmer-register">
                      <button className="btn btn-success btn-large joinbtn">Farmers</button>
            </NavLink> 
            <img className="m-3" src="/images/farmyJoin.png" alt="" />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
            {/* <NavLink to="/owner-register"> */}
                      <button className="btn btn-success btn-large fleetjoinbtn">Fleet Owners</button>
            {/* </NavLink>  */}
            <form className="m-4" id="contact-form" onSubmit={this.registerOwner} >
                        <select required className='form-group form-control' onChange={this.handleChange("title")} value={title} > 
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
                            <input type="text" className="form-control" onChange={this.handleChange("fullName")} value={fullName} placeholder="Full Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" onChange={this.handleChange("email")} value={email} placeholder="Email Address" />
                        </div>
                        <select required className='form-group form-control' onChange={this.handleChange("gender")} value={gender} > 
                            <option>Select Gender</option>
                            <option>male</option>
                            <option>female</option>
                            <option>others</option>
                        </select>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("phone")} value={phone} placeholder="Phone Number" />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="2"  onChange={this.handleChange("address")} value={address} placeholder="Address"></textarea>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("town")} value={town} placeholder="Town" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("state")} value={state} placeholder="State" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("country")} value={country} placeholder="Country" />
                        </div>
                        <select required className='form-group form-control' onChange={this.handleChange("role")} value={role} > 
                            <option>Select Your Role</option>
                            <option>Owner</option>
                            <option>Manager</option>
                            <option>CEO</option>
                            <option>others</option>
                        </select>
                        <div className="form-group">
                             <textarea className="form-control" rows="2" onChange={this.handleChange("firmName")} value={firmName} placeholder="Firm Name"></textarea>
                        </div>
                        <div className="form-group">
                             <textarea className="form-control" rows="2" onChange={this.handleChange("firmAddress")} value={firmAddress} placeholder="Firm Address"></textarea>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" onChange={this.handleChange("password")} value={password} placeholder="Password" />
                        </div>
                        <div>
                            <input className="mr-2" type="checkbox" name="checkbox" value="check" id="agree" /> 
                           I have read and agree to the <span className="text-success" > <a className="text-success" href="/terms-and-conditions"> Terms and Conditions</a> 
                            </span> and <span className="text-success"  href="/terms-and-conditions"> <a className="text-success" href="/terms-and-conditions">  Privacy Policy</a> </span>
                        </div>
                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-2 ">Register</button>
                         <p className="p mb-5">Already have an account ? <span className="text-success"><a className="text-success" href="/login-farmer"> Login</a> </span> </p>
                               
                    </form>

                    {showError === true && registerError === true && (
                                <div>
                                <p className="text-danger font-weight-bold">All fields are required.</p>
                                </div>
                            )}
                             {showError === true && loginError === true && (
                            <div>
                            <p className="text-danger font-weight-bold">
                                That email is already taken. Please choose another
                                or login.
                            </p>
                            <span className="mt-5 h2"><a className="text-success" href="/login">Login</a></span>
                            </div>
                        )}
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
            <NavLink to="/agent-register">
                      <button className="btn btn-success btn-large joinbtn">Agents</button>
            </NavLink> 
                    <img className="m-3" src="/images/youthJoin.png" alt="" />
            </div>

            </div>
            <Footer />
        </div>
    );
  }
  if (messageFromServer === 'user created') {
    //   i need flash here
    return <Redirect to={`/userProfile/${email}`} />;
}
}
}