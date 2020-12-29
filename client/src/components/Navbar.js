import React, { useEffect, useState, Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLink, Redirect } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';
import userImg from '../assets/user1.png';

export default class MainNavbar extends Component  {
    constructor() {
        super();
        this.state = {
          agents: [],
        }
      }

//   logout = () => {
//     // e.preventDefault();
//       localStorage.clear();
//     //   localStorage.removeItem('JWT');
//       window.location = "/login"
//     };

    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        // localStorage.removeItem('JWT');
        window.location = "/login"
      };

    render() {
        const {
            email,
            }  = this.state
            let data = this.state.agents;
        return (
        <Navbar bg="success" expand="lg" >
        {/* <Navbar.Brand className="navbar-brand font-weight-bolder text-light ml-5 mr-4 nav-text-head tractive-logo" href="/">Tractive</Navbar.Brand> */}
        <NavLink className="navbar-brand font-weight-bolder text-light ml-5 mr-4 nav-text-head tractive-logo" to="/">
            TractiveEngine
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                    <NavLink
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/iot-center">Iot Center
                        <span class="sr-only">(current)</span>
                    </NavLink>
                </li>
              <li className="nav-item">
                    <NavLink
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to={localStorage.user?"/fleets":"/protect-route"}>Fleets
                        <span class="sr-only">(current)</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/contact-us">Contact Us
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light font-weight-bold " to="/about">About Us
                    </NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink className="nav-link text-light font-weight-bold" to="/post-fleet">Post Fleet
                    </NavLink>
                </li> */}

           {localStorage.JWTA ?
                <NavDropdown className="text-white profile-detail nav-for-profile"  title={<span> <img  className="img-thumbnail profile_image_navbar"
                src={localStorage.image?localStorage.image: userImg}  alt="user" /> {localStorage.name}</span>  } id="basic-nav-dropdown" style={{color: "white"}}>

                <li className="nav-item nav-for-profile" >
                      <NavLink className="nav-link text-success font-weight-bold" to={`/profile-agent/${localStorage.email}`}>Profile
                      </NavLink>
                  </li>
                  <li className="nav-item nav-for-profile"  onClick={this.logout}>
                      <NavLink className="nav-link text-success font-weight-bold" to="/login">Logout
                      </NavLink>
                  </li>
              </NavDropdown>
            : null}

           {localStorage.JWTF ?
                <NavDropdown className="text-white profile-detail nav-for-profile"  title={<span> <img  className="img-thumbnail profile_image_navbar"
                src={localStorage.image?localStorage.image: userImg}  alt="user" /> {localStorage.name}</span>  } id="basic-nav-dropdown" style={{color: "white"}}>

                <li className="nav-item nav-for-profile" >
                      <NavLink className="nav-link text-success font-weight-bold" to={`/profile-farmer/${localStorage.email}`}>Profile
                      </NavLink>
                  </li>
                  <li className="nav-item nav-for-profile"  onClick={this.logout}>
                      <NavLink className="nav-link text-success font-weight-bold" to="/login">Logout
                      </NavLink>
                  </li>
              </NavDropdown>
            : null
             }

           {localStorage.JWTO ?
                <NavDropdown className="text-white profile-detail nav-for-profile"  title={<span> <img  className="img-thumbnail profile_image_navbar"
                src={localStorage.image?localStorage.image: userImg}  alt="user" /> {localStorage.name}</span>  } id="basic-nav-dropdown" style={{color: "white"}}>

                <li className="nav-item nav-for-profile" >
                      <NavLink className="nav-link text-success font-weight-bold" to={`/profile-owner/${localStorage.email}`}>Profile
                      </NavLink>
                  </li>
                  <li className="nav-item nav-for-profile"  onClick={this.logout}>
                      <NavLink className="nav-link text-success font-weight-bold" to="/login">Logout
                      </NavLink>
                  </li>
              </NavDropdown>
            : null }
            {!localStorage.user &&
                  <NavDropdown className="text-white"  title="Login" id="basic-nav-dropdown">
              <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/login-farmer">Farmer
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/login-owner">Fleet Owner
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/login-agent">Agent
                    </NavLink>
                </li>
            </NavDropdown>
             }
             { !localStorage.user &&
               <NavDropdown className="text-white" bg="success"  title="Join Us" id="basic-nav-dropdown">
               <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/farmer-register">Farmer
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/owner-register">Fleet Owner
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/agent-register">Agent
                    </NavLink>
                </li>
             </NavDropdown>
             }
        </ul>
          {/* <Nav className="mr-auto">
          </Nav> */}
          {/* <Form inline> */}
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
           {/* <NavLink> */}
              {/* <Button href="/fleets" variant="outline-light">Search Fleets</Button> */}
             {/* </NavLink>  */}
          {/* </Form> */}
        </Navbar.Collapse>
      </Navbar>
      );
  }
}
// export default MainNavbar;
=======
// navbar component
import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLink, Redirect } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';

export default class MainNavbar extends Component {
  constructor(props) {
      super(props);

    this.state = {
      loggedIn: false,
      }
    }

    componentDidMount() {
      if (window.localStorage.getItem("JWT")) {
        this.setState({ loggedIn: true })
      }
    }

    logout = (e) => {
      e.preventDefault();
      localStorage.removeItem('JWT');
      window.location = "/login"
    };

  render() {

      return (

        <Navbar bg="success" expand="lg" >
        {/* <Navbar.Brand className="navbar-brand font-weight-bolder text-light ml-5 mr-4 nav-text-head tractive-logo" href="/">Tractive</Navbar.Brand> */}
        <NavLink className="navbar-brand font-weight-bolder text-light ml-5 mr-4 nav-text-head tractive-logo" to="/">
            Tractive
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                    <NavLink
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/">Home
                        <span class="sr-only">(current)</span>
                    </NavLink>
                </li>
              <li className="nav-item">
                    <NavLink
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/fleets">Market Place
                        <span class="sr-only">(current)</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/contact-us">Contact Us
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light font-weight-bold " to="/about">About Us
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light font-weight-bold" to="/post-fleet">Post Fleet
                    </NavLink>
                </li>

           {localStorage.JWT ?
            // <Nav.Link className="text-light font-weight-bold" onClick={this.logout}   href="/login">Logout</Nav.Link>
                <li onClick={this.logout}  className="nav-item">
                      <NavLink className="nav-link text-light font-weight-bold" to="/login">Logout
                      </NavLink>
                </li>
            :
            <NavDropdown className="text-white"  title="Login" id="basic-nav-dropdown">
              <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/login-farmer">Farmer
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/login-owner">Fleet Owner
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/login-agent">Agent
                    </NavLink>
                </li>
            </NavDropdown>
             }

             {
                !localStorage.JWT &&
                // <Nav.Link className="text-light font-weight-bold" onClick={this.logout}   href="/login">Logout</Nav.Link>
                // &&
                // <Nav.Link className="text-light font-weight-bold"  href="/update-profile">Update Profile</Nav.Link>
                // :
               <NavDropdown className="text-white" bg="success"  title="Join Us" id="basic-nav-dropdown">
               <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/farmer-register">Farmer
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/owner-register">Fleet Owner
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-success font-weight-bold" to="/agent-register">Agent
                    </NavLink>
                </li>
             </NavDropdown>

             }
        </ul>
          {/* <Nav className="mr-auto">
          </Nav> */}
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
           {/* <NavLink> */}
              <Button href="/fleets" variant="outline-light">Search Fleets</Button>
             {/* </NavLink>  */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
  }
}

// export default class MainNavbar extends Component {
//   render() {
//     return (
//       <Navbar>
//         <Navbar.Header>
//           <Navbar.Brand>
//             <a href="#">React-Bootstrap</a>
//           </Navbar.Brand>
//         </Navbar.Header>
//         <Nav>
//           <NavItem eventKey={1} href="#">Link</NavItem>
//           <NavItem eventKey={2} href="#">Link</NavItem>
//           <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-    dropdown">
//             <MenuItem eventKey={3.1}>Action</MenuItem>
//             <MenuItem eventKey={3.2}>Another action</MenuItem>
//             <MenuItem eventKey={3.3}>Something else here</MenuItem>
//             <MenuItem divider />
//             <MenuItem eventKey={3.4}>Separated link</MenuItem>
//           </NavDropdown>
//         </Nav>
//       </Navbar>

// // <nav className="navbar navbar-expand-lg navbar-light bg-success shadow mobile-color">
// //     <div className="container">
// //       <a className="navbar-brand font-weight-bolder text-light nav-text-head tractive-logo" href="/" >Tractive</a>
// //       <button
// //           className="navbar-toggler "
// //           type="button" data-toggle="collapse"
// //           data-target="#navbarResponsive"
// //           aria-controls="navbarResponsive"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //             <span className="navbar-toggler-icon bg-white"></span>
// //           </button>
// //       <div className="collapse navbar-collapse" id="navbarResponsive">

// //         <form className="form-inline ml-auto" onSubmit={this.onSubmit}>
// //           <div>
// //           <input className="form-control mr-sm-2" type="text"  placeholder="Search Fleets" />
// //                   <button type="submit" className="btn btn-outline-light">Search</button>
// //           </div>
// //         </form>

// //         <ul className="navbar-nav ml-auto">
// //           <li className="nav-item">
// //                     <NavLink
// //                         className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/fleets">Fleets
// //                         <span class="sr-only">(current)</span>
// //                     </NavLink>
// //                 </li>
// //                 <li className="nav-item">
// //                     <NavLink
// //                         className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/contact-us">Contact Us
// //                     </NavLink>
// //                 </li>
// //                 <li className="nav-item">
// //                     <Link className="nav-link text-light font-weight-bold " to="/about">About Us
// //                     </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                     <Link className="nav-link text-light font-weight-bold" to="/post-fleet">Post Fleet
// //                     </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                     <Link className="nav-link text-light font-weight-bold" to="/join-us">Join Us
// //                     </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                     <Link className="nav-link text-light font-weight-bold" to="/login">Login
// //                     </Link>
// //                 </li>

// //         </ul>
// //       </div>
// //     </div>
// //   </nav>
//     );
//   }
// }
>>>>>>> c03f9839af4e99c51c71928daba44010f3a3f8b0
