import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Footer from "../components/Footer";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
toast.configure()

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
            image: null,
            messageFromServerFarmer: '',
            showError: false,
            registerError: false,
            loginError: false,
            showMessage: false,

        };
    }

    handleUpload=e=>{
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'zeeson1')
        this.setState({imageLoading:true})
        axios.post('https://api.cloudinary.com/v1_1/zeeson-info-tech-and-innovations/image/upload',data)
        .then(res=>{
          this.setState({
            image:res.data.secure_url,
            imageLoading:false
          })
        })
       }

    handleChange = farmer => (event) => {
        this.setState({
          [farmer]: event.target.value,
        });
      };

    registerFarmer = async (e) => {
        e.preventDefault();
        const {
            title, address, town, state, farmSize, farmAddress, crops, fullName, gender, email, phone,  country, image, password,
        } = this.state;
        const theState = {
            title, address, town, state, farmSize, farmAddress, crops, fullName, gender, email, phone,  country, image, password,
        }
            if(email === "" || password === ""){
               return  this.setState({
                    showError: true,
                    loginError: false,
                    registerError: true,
                    showMessage: toast.error("Error! Username or Password field empty", {
                        // autoClose: 10000,
                    }),
                });
            } if(title === "" || address === "" || state === "" || farmSize === "") {
                this.setState({
                    showMessage: toast.error("All fields are required", {

                    }),
                })
            } else {
                try {
                    const response = await axios.post(
                      '/farmers/signup',
                      {
                        title, address, town, state, farmSize, farmAddress, crops, fullName, gender, email, phone,  country, image, password
                      },
                    );
                    if(response.data.message){
                         this.setState({
                            showMessage: toast.success("SUCCESS", {
                                autoClose: 10000,
                            }),
                            messageFromServerOwner: response.data.message,
                            showError: false,
                            loginError: false,
                            registerError: false,

                        });
                    } else{
                        this.setState({
                            showMessage: toast.warning(`${response.data.err}`, {

                            }),
                            messageFromServerOwner: response.data.message,
                            showError: false,
                            loginError: false,
                            registerError: false,

                          });
                    }
                    window.location = '/login-farmer';
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
        farmSize,
        farmAddress,
        crops,
        password,
        image,
        messageFromServerFarmer,
        showError,
        registerError,
        loginError,
        showMessage,
      } = this.state;

        if (messageFromServerFarmer === '') {
            return (
                <div className="m">
                    <div className="mt-5 ">
                        <p className="h1 text-success contact-formHeader font-weight-bold">Get results. Join us today</p>
                        <p className="h4 text-success contact-formHeader font-weight-bold">You will never regret it.</p>
                    </div>
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
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
                                    <input type="password" className="form-control" onChange={this.handleChange("password")} value={password} placeholder="Password" />
                                </div>
                                <div className="form-group">
                                     <label>Click "Choose File" button to upload your profile picture</label>
                                    <input className="form-control" type="file" name="image" onChange={this.handleUpload} />
                                 </div>
                                <div>
                                    <input className="mr-2" type="checkbox" name="checkbox" value="check" id="agree" />
                                    I have read and agree to the <span className="text-success" > <a className="text-success" href="/terms-and-conditions"> Terms and Conditions</a>
                                    </span> and <span className="text-success"  href="/terms-and-conditions"> <a className="text-success" href="/terms-and-conditions">  Privacy Policy</a> </span>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-lg btn-success contactbtn mb-2 "  onClick={() => showMessage} >Register</button>
                                </div>
                                <p className="p mb-5">Already have an account ? <span className="text-success"><a className="text-success" href="/login-farmer"> Login</a> </span> </p>
                                {/* <NavLink to="/login">
                                            <button className="btn h2 btn-success">Login</button>
                                </NavLink>  */}
                            </form>
                                {/* {showError === true && registerError === true && (
                                <div>
                                <p className="text-danger h5">All fields are required.</p>
                                </div>
                            )} */}
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
                    <NavLink to="/owner-register">
                            <button className="btn btn-success btn-large fleetjoinbtn">Fleet Owners</button>
                    </NavLink>
                    <img className="m-3" src="/images/tractyJoin.png" alt="" />
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
        // if (messageFromServerFarmer === 'user created') {
        //     return (
        //       <div>
        //           <NavLink to="/login">
        //                 {/* need a flash */}
        //                  <h3>User successfully registered!</h3>
        //                 <button className="ml-2 h2 text-success">Login</button>
        //           </NavLink>

        //       </div>
            // );
        // }
    }
}
