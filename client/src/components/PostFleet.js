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
            ownerNumber: "",
            ownerEmail: "",
            ownerContact: "",
            chargePerAcre: "",
            availability: "",
            image: null,
            message: null, 
            imageLoading: false
            
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handlePurposeChange = this.handlePurposeChange.bind(this);
        this.handleOwnerNumberChange = this.handleOwnerNumberChange.bind(this);
        this.handleOwnerEmailChange = this.handleOwnerEmailChange.bind(this);
        this.handleOwnerContactChange = this.handleOwnerContactChange.bind(this);
        this.handleChargePerAcreChange = this.handleChargePerAcreChange.bind(this); 
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

   handleOwnerNumberChange(e) {
       this.setState({ownerNumber: e.target.value})
   }
   handleOwnerEmailChange(e) {
       this.setState({ownerEmail: e.target.value})
   }
   handleOwnerContactChange(e) {
       this.setState({ownerContact: e.target.value})
   }
   handleChargePerAcreChange(e) {
       this.setState({chargePerAcre: e.target.value})
   }

   handleAvailabilityChange(e) {
    this.setState({availability: e.target.value})
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


   postFleet(event) {
       event.preventDefault();
       const fleetPost = {
           name: this.state.name,
           desc: this.state.desc,
           purpose: this.state.purpose,
           ownerNumber: this.state.ownerNumber,
           ownerEmail: this.state.ownerEmail,
           ownerContact: this.state.ownerContact,
           chargePerAcre: this.state.chargePerAcre,
           image: this.state.image,
           availability: this.state.availability,
           message: this.state.message
       };

       console.log(fleetPost)

       axios.post("/fleets", fleetPost)
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
                            <div className="form-group">
                                <input required type="text" className="form-control" onChange={this.handleOwnerNumberChange} value={this.state.ownerNumber} placeholder="Your mobile number" />
                            </div>
                            <div className="form-group">
                                <input required type="email" className="form-control" onChange={this.handleOwnerEmailChange} value={this.state.ownerEmail} placeholder="Your email" />
                            </div>
                            <div className="form-group">
                                <input required type="text" className="form-control" onChange={this.handleOwnerContactChange} value={this.state.ownerContact} placeholder="Contact address" />
                            </div>
                            <select required className='form-group form-control' value={this.state.availability} onChange={this.handleAvailabilityChange} > 
                                <option>Availability</option>
                                <option>Currently available</option>
                                <option>One week time</option>
                                <option>Two weeks - Four weeks time</option>
                                <option>Currently unavailable</option>
                            </select>
                            <div className="form-group">
                                <input required value={this.state.chargePerAcre} onChange={this.handleChargePerAcreChange} type="text" className="form-control" placeholder="Charge per Acre e.g 2400 per acre" />
                            </div>
                            <div className="form-group">
                                <label>Click "Choose File" button to upload a picture of the fleet. THIS IS OPTIONAL</label>
                                    <input className="form-control" type="file" name="image" onChange={this.handleUpload} />
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