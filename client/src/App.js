import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Home from './components/Home';

import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import JoinUs from './components/JoinUsPage';

import AgentRegister from './agent/AgentRegister';
import AgentLogin from './agent/AgentLogin';
import ProfileAgent from './agent/ProfileAgent';
import Agents from './agent/Agents';

import PostFleet from './components/PostFleet';
import Fleets from './components/Fleets';
import LoginPage from './components/LoginPage';

import FarmerRegister from './farmer/FarmerRegister';
import FarmerLogin from './farmer/FarmerLogin';
import ProfileFarmer from './farmer/ProfileFarmer';
import Farmers from './farmer/Farmers';

import OwnerRegister from './owner/OwnerRegister';
import OwnerLogin from './owner/OwnerLogin';
import ProfileOwner from './owner/ProfileOwner';
import Owners from './owner/Owners';
import Owner from './owner/Owner';

import TermsAndConditions from './components/TermsAndCondition';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UpdatePassword from './components/UpdatePassword';

import ProtectRoute from './components/ProtectRoute';
import AgentSuccess from './UtilityRoutes/AgentSuccess';
import FarmerSuccess from './UtilityRoutes/FarmerSuccess';
import OwnerSuccess from './UtilityRoutes/OwnerSuccess';
import Fleet from './components/ShowFleet';

// import EditUser from './components/EditUser';

class App extends Component {
  //new comment
  componentDidMount = () => {
    Axios.interceptors.request.use(function (config) {
      const token = localStorage.token;
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact strict component={Home} />
          <Route path="/contact-us" exact component={ContactUs} />
          <Route path="/about" exact component={AboutUs} />
          <Route path="/join-us" exact component={JoinUs} />
          <Route path="/farmer-register" exact component={FarmerRegister} />
          <Route path="/owner-register" exact component={OwnerRegister} />
          <Route path="/agent-register" exact component={AgentRegister} />
          <Route path="/protect-route" exact component={ProtectRoute} />
          <Route path="/agent-success" exact component={AgentSuccess} />
          <Route path="/farmer-success" exact component={FarmerSuccess} />
          <Route path="/owner-success" exact component={OwnerSuccess} />

          <AuthenticatedRoute path="/post-fleet" exact component={PostFleet} />

          <AuthenticatedRoute path="/fleets" exact component={Fleets} />
          <AuthenticatedRoute path="/fleet/:id" exact component={Fleet} />
          <AuthenticatedRoute path="/owners" exact component={Owners} />

          <Route path="/login" exact component={LoginPage} />
          <Route path="/login-farmer" exact component={FarmerLogin} />
          <Route path="/login-owner" exact component={OwnerLogin} />
          <Route path="/login-agent" exact component={AgentLogin} />

          <AuthenticatedRoute
            path="/profile-farmer/:email"
            exact
            component={ProfileFarmer}
          />
          <AuthenticatedRoute
            path="/profile-owner/:email"
            exact
            component={ProfileOwner}
          />
          <AuthenticatedRoute
            path="/profile-agent/:email"
            exact
            component={ProfileAgent}
          />

          <Route
            path="/terms-and-conditions"
            exact
            component={TermsAndConditions}
          />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/reset/:token" exact component={ResetPassword} />
          <Route
            path="/update-profile/:email"
            exact
            component={UpdateProfile}
          />
          <Route
            path="/update-password/:email"
            exact
            component={UpdatePassword}
          />
          <Route path="/owners/signup" exact strict component={Owner} />
          <AuthenticatedRoute path="/agents" exact strict component={Agents} />
          <AuthenticatedRoute path="/farmers" exact component={Farmers} />
          {/* errorroute */}
          {/* <Route path="*"   component={Error} /> */}
        </div>
        {/* <Footer /> */}
      </Router>
    );
  }
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('JWT') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={
            {
              pathname: '/protect-route',
              state: {
                from: props.location.state,
                message: 'Message from other page',
                flash: 'Message from other page',
              },
              // state: 'Please sign in or register'
            }
            //     <FlashMessage duration={10000}>
            //     <strong className="text-success h4">Please sign in or register, Thanks!</strong>
            // </FlashMessage>
          }
        />
      )
    }
  />
);

export default App;
