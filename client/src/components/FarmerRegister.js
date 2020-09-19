

import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import axios from 'axios';
// import "./JoinUsPage.css";

export default class FarmerRegister extends Component {
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
            farmSize: "",
            farmAddress: "",
            crops: "",
            password: "", 
            showError: false, 
            registerError: false,
            loginError: false
        
        };

        // this.handleTitleChange = this.handleTitleChange.bind(this);
        // this.handleFullNameChange = this.handleFullNameChange.bind(this);
        // this.handleGenderChange = this.handleGenderChange.bind(this);
        // this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handlePhoneChange = this.handlePhoneChange.bind(this);
        // this.handleAddressChange = this.handleAddressChange.bind(this);
        // this.handleTownChange = this.handleTownChange.bind(this);
        // this.handleStateChange = this.handleStateChange.bind(this);
        // this.handleCountryChange = this.handleCountryChange.bind(this);
        // this.handleFarmSizeChange = this.handleFarmSizeChange.bind(this);
        // this.handleFarmAddressChange = this.handleFarmAddressChange.bind(this);
        // this.handleCropsChange = this.handleCropsChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleChange = farmer => (event) => {
        this.setState({
          [farmer]: event.target.value,
        });
      };

    registerFarmer = async (e) => {
        e.preventDefault(); 
        const {
            title, address, town, state, farmSize, farmAddress, crops, fullName, gender, email, phone,  country, password,
        } = this.state; 
            if(email === "" || password === ""){
                this.setState({
                    showError: true,
                    loginError: false,
                    registerError: true
                });
            } else {
                try {
                    const res = await axios.post(
                        "http://localhost:2020/farmers/signup", 
                    {
                        title, address, town, state, farmSize, farmAddress, crops, fullName, gender, email, phone,  country, password,
                    },
                    );
                    this.setState({
                        messageFromServer: res.data.message,
                        showError: false,
                        loginError: false,
                        registerError: false,
                    });
                } catch (err) {
                    console.error(err.res.data); 
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
        farmSize,
        farmAddress,
        crops,
        password, 
      } = this.state;

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
             {/* <NavLink to="/farmer-register"> */}
                      <button className="btn btn-success btn-large joinbtn">Farmers</button>
            {/* </NavLink>  */}
            <form className="m-4" id="contact-form" onSubmit={this.registerFarmer} >
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
                            <textarea className="form-control" rows="2" onChange={this.handleChange("address")} value={address} placeholder="Address"></textarea>
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
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("farmSize")} value={farmSize} placeholder="Farm Size e.g 4 acre" />
                        </div>
                        <div className="form-group">
                             <textarea className="form-control" rows="2" onChange={this.handleChange("farmAddress")} value={farmAddress} placeholder="Farm Address"></textarea>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("crops")} value={crops} placeholder="Crops grown e.g Maize, Rice, Cassava etc" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("password")} value={password} placeholder="Passwprd" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 mr-5">Register</button>
                    </form>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            <NavLink to="/owner-register">
                      <button className="btn btn-success btn-large fleetjoinbtn">Fleet Owners</button>
            </NavLink> 
            <img className="m-3" src="/images/tractyJoin.png" alt="" />
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