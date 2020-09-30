import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "./JoinUsPage.css";

export default class AgentRegister extends Component {

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
            education: "", 
            employmentStatus: "", 
            cvLink: "",
            password: "", 
            messageFromServer: '',
            showError: false,
            registerError: false,
            loginError: false
        
        };
    }

    handleChange = agent => (event) => {
        this.setState({
          [agent]: event.target.value,
        });
      };

    registerAgent = async (e) => {
        e.preventDefault(); 
        const {
            title, address, town, state, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password
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
                      'http://localhost:2020/agents/signup',
                      {
                        title, address, town, state, fullName, gender, email, phone,  country,  education, employmentStatus, cvLink, password
                      },
                    );
                    window.location = '/login-agent';
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
        education, 
        employmentStatus, 
        cvLink, 
        password, 
        messageFromServer,
        showError,
        registerError,
        loginError,
      } = this.state;
      
    if (messageFromServer === '') {
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
            <NavLink to="/owner-register">
                      <button className="btn btn-success btn-large fleetjoinbtn">Fleet Owners</button>
            </NavLink> 
            <img className="m-3" src="/images/tractyJoin.png" alt="" />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            {/* <NavLink to="/agent-register"> */}
                      <button className="btn btn-success btn-large joinbtn">Agents</button>
            {/* </NavLink>  */}
            <form className="m-4" id="contact-form" onSubmit={this.registerAgent} >
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
                            <input type="text" className="form-control" onChange={this.handleChange("fullName")} value={fullName}  placeholder="Full Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" onChange={this.handleChange("email")} value={email} placeholder="Email Address" />
                        </div>
                        <select required className='form-group form-control' onChange={this.handleChange("gender")} value={gender}  > 
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
                        <select required className='form-group form-control' onChange={this.handleChange("education")} value={education} > 
                            <option>Education</option>
                            <option>O/Level</option>
                            <option>diploma/NCE</option>
                            <option>degree</option>
                            <option>masters</option>
                            <option>Ph.D</option>
                            <option>others</option>
                        </select>
                        <select required className='form-group form-control' onChange={this.handleChange("employmentStatus")} value={employmentStatus} > 
                            <option>Employment Status</option>
                            <option>employed</option>
                            <option>unemployed</option>
                            <option>self-employed</option>
                            <option>students</option>
                            <option>others</option>
                        </select>
                        <div className="form-group">
                            <label className="mr-5">Upload your resume <span className="ml-2 font-weight-bold">OPTIONAL</span> </label>
                            <input type="file" className="form-control" onChange={this.handleChange("cvLink")} value={cvLink} placeholder="" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("password")} value={password} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 mr-5">Register</button>
                    </form>
                      {showError === true && registerError === true && (
                                <div>
                                <p className="text-success">All fields are required.</p>
                                </div>
                            )}
                             {showError === true && loginError === true && (
                            <div>
                            <p className="text-danger">
                                That email is already taken. Please choose another
                                or login.
                            </p>
                            <span className="mt-5 h2"><a className="text-success" href="/login">Login</a></span>
                            </div>
                        )}
                    </div>

                </div>
        </div>
        );
        }
        else if(messageFromServer === 'user created') {
            //   i need flash here
            return <Redirect to={`/userProfile/${email}`} />;
        }
    }
}