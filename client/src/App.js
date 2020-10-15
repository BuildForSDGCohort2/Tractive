import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect } from "react-router-dom"; 
import FlashMessage from 'react-flash-message';
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
import Farmers from "./components/Farmers"


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

          <AuthenticatedRoute path="/post-fleet" exact component={PostFleet}/>

          <Route path="/fleet" exact component={Fleets}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/login-farmer" exact component={FarmerLogin}/>
          <Route path="/login-owner" exact component={OwnerLogin}/>
          <Route path="/login-agent" exact component={AgentLogin}/>

          <AuthenticatedRoute path="/profile-farmer/:email" exact component={ProfileFarmer}/>
          <AuthenticatedRoute path="/profile-owner/:email" exact component={ProfileOwner}/>
          <AuthenticatedRoute path="/profile-agent/:email" exact component={ProfileAgent}/>

          <Route path="/terms-and-conditions" exact component={TermsAndConditions }/>
          <Route path="/forgot-password" exact component={ForgotPassword }/>
          <Route path="/reset/:token" exact component={ResetPassword }/>
          <Route path="/update-profile/:email" exact component={UpdateProfile }/>
          <Route path="/update-password/:email" exact component={UpdatePassword}/>
          <Route path="/owners/signup" exact strict component={Owner}/>
          <AuthenticatedRoute path="/agents" exact strict component={Agents}/>
          <AuthenticatedRoute path="/farmers" exact component={Farmers}/>
        </div>
        {/* <Footer /> */}
      </Router>
    );
  }
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('JWT') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { 
          from: props.location.state,
          message: 'Message from other page'

        }
        // state: 'Please sign in or register' 
        
      }}/>
      
    )
  )}/>
)


export default App;
