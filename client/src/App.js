import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/Navbar';
import Home from './components/Home';
import Owner from './components/Owner';
import Footer from "./components/Footer"
import ContactUs from "./components/ContactUs"
import AboutUs from "./components/AboutUs"
import JoinUs from "./components/JoinUsPage"
import FarmerRegister from "./components/FarmerRegister"
import OwnerRegister from "./components/OwnerRegister"
import AgentRegister from "./components/AgentRegister"
import PostFleet from "./components/PostFleet"
import Fleets from "./components/Fleets"
import LoginPage from "./components/LoginPage"
import FarmerLogin from "./components/FarmerLogin"
import OwnerLogin from "./components/OwnerLogin"
import AgentLogin from "./components/AgentLogin"
import ProfileFarmer from "./components/ProfileFarmer"
import ProfileOwner from "./components/ProfileOwner"
import ProfileAgent from "./components/ProfileAgent"
import TermsAndConditions  from "./components/TermsAndCondition"
import UpdateProfile from "./components/UpdateProfile"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import UpdatePassword from "./components/UpdatePassword"
import  Agents  from './components/Agents';


// import EditUser from './components/EditUser';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact strict component={Home}/>
          <Route path="/contact-us" exact component={ContactUs}/>
          <Route path="/about" exact component={AboutUs}/>
          <Route path="/join-us" exact component={JoinUs}/>
          <Route path="/farmer-register" exact component={FarmerRegister}/>
          <Route path="/owner-register" exact component={OwnerRegister}/>
          <Route path="/agent-register" exact component={AgentRegister}/>
          <Route path="/post-fleet" exact component={PostFleet}/>
          <Route path="/fleets" exact component={Fleets}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/login-farmer" exact component={FarmerLogin}/>
          <Route path="/login-owner" exact component={OwnerLogin}/>
          <Route path="/login-agent" exact component={AgentLogin}/>
          <Route path="/profile-farmer/:email" exact component={ProfileFarmer}/>
          <Route path="/profile-owner/:email" exact component={ProfileOwner}/>
          <Route path="/profile-agent/:email" exact component={ProfileAgent}/>
          <Route path="/terms-and-conditions" exact component={TermsAndConditions }/>
          <Route path="/update-profile" exact component={UpdateProfile }/>
          <Route path="/forgot-password" exact component={ForgotPassword }/>
          <Route path="/reset-password" exact component={ResetPassword }/>
          <Route path="/update-password" exact component={UpdatePassword}/>
          <Route path="/owners/signup" exact strict component={Owner}/>
          <Route path="/agents" exact strict component={Agents}/>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
