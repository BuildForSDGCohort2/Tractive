import React, { Component } from 'react';
import axios from "axios";
// import { Redirect } from "react-router"; 
// import Button from 'react-bootstrap/Button';
// import { NavLink } from "react-router-dom";
import "./PostFleet.css";

export default class PostFleet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            purpose: "",
            image: "",
            availability: ""
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handlePurposeChange = this.handlePurposeChange.bind(this);
        this.handleImageChnage = this.handleImageChnage.bind(this); 
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
        this.postFleet = this.postFleet.bind(this);
    }
    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

   handleDescChange(e) {
       this.setState({desc: e.target.value})
   }

   handlePurposeChange(e) {
       this.setState({purpose: e.target.value})
   }

   handleImageChnage(e) {
    this.setState({image: e.target.value})
   }

   handleAvailabilityChange(e) {
    this.setState({availability: e.target.value})
   }

   postFleet(event) {
       event.preventDefault();
       const fleetPost = {
           name: this.state.name,
           desc: this.state.desc,
           purpose: this.state.purpose,
           image: this.state.image,
           availability: this.state.availability
       };
       console.log(fleetPost)

       axios.post("http://localhost:2020/fleets", fleetPost)
       .then(res => console.log(res.data));
       window.location = '/fleets';

       }

  render() {
    return (
            <div className="mb-5 fleet">
            <div className="mt-5 contact-formHeader">
                <p className="h1 text-success">Get client with ease. Post a fleet for everyone today</p>
                {/* <p className="h3 text-success">Your comfort matters to us .</p> */}
            </div>
            <div className="container mt-5">
                <div className="row">
                <div className="col-1"> </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 fleetpost">
                        <p className="h5 mt-5 mb-4 ml-4">Fill out the form below to post a fleet:</p>
                        <form className="m-4" id="contact-form" onSubmit={this.postFleet} >
                        <div className="form-group">
                            <input required type="text" className="form-control" onChange={this.handleNameChange} value={this.state.name} placeholder="Fleet Name e.g Tractor, Sprayer etc." />
                        </div>
                        <div className="form-group">
                            <textarea required value={this.state.desc} onChange={this.handleDescChange} className="form-control" rows="2" placeholder="Description e.g This is a 2 wheeler crawler tractor used for bush clearing"></textarea>
                        </div>
                        <div className="form-group">
                            <input required value={this.state.purpose} onChange={this.handlePurposeChange} type="text" className="form-control" aria-describedby="emailHelp" placeholder="Purpose e.g to plough the farm" />
                        </div>
                        <select required className='form-group form-control' value={this.state.availability} onChange={this.handleAvailabilityChange} > 
                            <option>Availability</option>
                            <option>Currently available</option>
                            <option>One week time</option>
                            <option>Two weeks - Four weeks time</option>
                            <option>Currently unavailable</option>
                        </select>
                    
                        <div className="form-group">
                            <label>Click "Choose File" button to upload a picture of the fleet. THIS IS OPTIONAL</label>
                                <input className="form-control" type="file" id="myFile" value={this.state.image} onChange={this.handleImageChnage} />
                        </div>
                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 mr-5">Post</button>
                    </form>
                 </div>
                </div>
            </div>
        </div>
    );
  }
}