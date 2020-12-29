// import React, { Component, useEffect } from 'react';
import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory } from "react-router-dom";
import FlashMessage from 'react-flash-message';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/Navbar';
import Home from './components/Home';
import IotCenter from './components/IotCenter'

import Footer from "./components/Footer"
import ContactUs from "./components/ContactUs"
import AboutUs from "./components/AboutUs"
import JoinUs from "./components/JoinUsPage"


import AgentRegister from "./agent/AgentRegister"
import AgentLogin from "./agent/AgentLogin"
import ProfileAgent from "./agent/ProfileAgent"
import  Agents  from './agent/Agents'

import PostFleet from "./components/PostFleet"
import Fleets from "./components/Fleets"
import LoginPage from "./components/LoginPage"

import FarmerRegister from "./farmer/FarmerRegister"
import FarmerLogin from "./farmer/FarmerLogin"
import ProfileFarmer from "./farmer/ProfileFarmer"
import Farmers from "./farmer/Farmers"

import OwnerRegister from "./owner/OwnerRegister"
import OwnerLogin from "./owner/OwnerLogin"
import ProfileOwner from "./owner/ProfileOwner"
import Owners from "./owner/Owners"
import Owner from './owner/Owner';

import TermsAndConditions  from "./components/TermsAndCondition"
import UpdateProfile from "./components/UpdateProfile"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import UpdatePassword from "./components/UpdatePassword"

import ProtectRoute from "./components/ProtectRoute"
import AgentSuccess from "./UtilityRoutes/AgentSuccess"
import FarmerSuccess from "./UtilityRoutes/FarmerSuccess"
import OwnerSuccess from "./UtilityRoutes/OwnerSuccess"
import Fleet from "./components/ShowFleet"

export const UserContext = createContext()
// import EditUser from './components/EditUser';


const App = () => {
  const history = useHistory()
  // const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    // if(user){
    //   return ({payload:user})
    // }else if(!localStorage.user ){
    //        history.push('/protect-route')
    // }
  },[])

  // if(localStorage.JWTA){
  //   return AuthenticatedRoute = ({ component: Component, ...rest }) => (
  //       <Route {...rest} render={props => (
  //         localStorage.getItem('JWTA') ? (
  //           <Component {...props}/>
  //         ) : (
  //           <Redirect to={{
  //             pathname: '/protect-route',
  //             state: {
  //               from: props.location.state,
  //               message: 'Message from other page',
  //               flash: 'Message from other page',
  //             }

  //           }
  //         }/>

  //         )
  //       )}/>
  //     )
  //   } else if(localStorage.JWTF){
  //     const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  //       <Route {...rest} render={props => (
  //         localStorage.getItem('JWTF') ? (
  //           <Component {...props}/>
  //         ) : (
  //           <Redirect to={{
  //             pathname: '/protect-route',
  //             state: {
  //               from: props.location.state,
  //               message: 'Message from other page',
  //               flash: 'Message from other page',
  //             }

  //           }
  //         }/>

  //         )
  //       )}/>
  //     )
  //   } else if(localStorage.JWTO){
  //     const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  //       <Route {...rest} render={props => (
  //         localStorage.getItem('JWTO') ? (
  //           <Component {...props}/>
  //         ) : (
  //           <Redirect to={{
  //             pathname: '/protect-route',
  //             state: {
  //               from: props.location.state,
  //               message: 'Message from other page',
  //               flash: 'Message from other page',
  //             }
  //           }
  //         }/>

  //         )
  //       )}/>
  //     )
  //   }
  // render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact strict component={Home}/>
          <Route path="/iot-center" exact strict component={IotCenter} />
          <Route path="/contact-us" exact component={ContactUs}/>
          <Route path="/about" exact component={AboutUs}/>
          <Route path="/join-us" exact component={JoinUs}/>
          <Route path="/farmer-register" exact component={FarmerRegister}/>
          <Route path="/owner-register" exact component={OwnerRegister}/>
          <Route path="/agent-register" exact component={AgentRegister}/>
          <Route path="/protect-route" exact component={ProtectRoute} />
          <Route path="/agent-success" exact component={AgentSuccess} />
          <Route path="/farmer-success" exact component={FarmerSuccess} />
          <Route path="/owner-success" exact component={OwnerSuccess} />

          <Route path="/post-fleet" exact component={PostFleet}/>

          <Route path="/fleets" exact component={Fleets}/>
          <Route path="/fleet/:id" exact component={Fleet}/>
          <Route path="/owners" exact component={Owners}/>

          <Route path="/login" exact component={LoginPage}/>
          <Route path="/login-farmer" exact component={FarmerLogin}/>
          <Route path="/login-owner" exact component={OwnerLogin}/>
          <Route path="/login-agent" exact component={AgentLogin}/>

          <Route path="/profile-farmer/:email" exact component={ProfileFarmer}/>
          <Route path="/profile-owner/:email" exact component={ProfileOwner}/>
          <Route path="/profile-agent/:email" exact component={ProfileAgent}/>

          <Route path="/terms-and-conditions" exact component={TermsAndConditions }/>
          <Route path="/forgot-password" exact component={ForgotPassword }/>
          <Route path="/reset/:token" exact component={ResetPassword }/>
          <Route path="/update-profile/:email" exact component={UpdateProfile }/>
          <Route path="/update-password/:email" exact component={UpdatePassword}/>
          <Route path="/owners/signup" exact strict component={Owner}/>
          <Route path="/agents" exact strict component={Agents}/>
          <Route path="/farmers" exact component={Farmers}/>
        </div>
        {/* <Footer /> */}
      </Router>
    );
  }
// }


export default App;
