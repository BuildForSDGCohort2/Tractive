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
import Login from "./components/Login"
import Profile from "./components/Profile"
import TermsAndConditions  from "./components/TermsAndCondition"


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
          <Route path="/login" exact component={Login}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/terms-and-conditions" exact component={TermsAndConditions }/>
          <Route path="/owners/signup" exact strict component={Owner}/>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
