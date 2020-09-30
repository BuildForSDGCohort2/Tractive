import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import FlashMessage from 'react-flash-message';
import axios from "axios";
import "./ContactUs.css";

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            subject: "",
            message: "",
            showMessage: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleMessageChnage = this.handleMessageChnage.bind(this);
        this.handleShowMessageChange = this.handleShowMessageChange.bind(this)
        this.contactUs = this.contactUs.bind(this);
    }
    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

   handleEmailChange (e) {
       this.setState({email: e.target.value})
   }

   handleSubjectChange(e) {
       this.setState({subject: e.target.value})
   }

   handleMessageChnage(e) {
    this.setState({message: e.target.value})
   }

   handleShowMessageChange(e) {
    this.setState({ showMessage: false })
   }


   contactUs(event) {
       event.preventDefault();
       const contact = {
           name: this.state.name,
           email: this.state.email,
           subject: this.state.subject,
           message: this.state.message,
       };
       console.log(contact)

       axios.post("http://localhost:2020/contact-us", contact)
       .then(res => console.log(res.data));
       this.setState({ showMessage: true })
    //    window.flash('Message has been sent successfully!', 'success')
    //    window.location.reload(false)
       }
      
  render() {
      const {
          showMessage
    } = this.state
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
                    <form className="m-4" id="contact-form" onSubmit={this.contactUs} method="POST">
                        <div className="form-group">
                            <input type="text" required className="form-control" onChange={this.handleNameChange} value={this.state.name} placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" required className="form-control" onChange={this.handleEmailChange} value={this.state.email} placeholder="Email Address" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleSubjectChange} value={this.state.subject} placeholder="Subject" />
                        </div>
                        <div className="form-group">
                            <textarea required className="form-control" rows="4" onChange={this.handleMessageChnage} value={this.state.message} placeholder="Enter your message"></textarea>
                        </div>
                        <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 mr-5">Contact us</button>
                    </form>
                    { showMessage &&  
                        <div >
                            <FlashMessage duration={10000}>
                                <strong className="text-success h4">Message sent successfully, Thanks!</strong>
                            </FlashMessage>
                        </div>
                        }
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