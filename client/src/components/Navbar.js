// navbar component
import React, { Component } from 'react';
import axios from "axios"; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from "react-router-dom";
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
        <Navbar.Brand className="navbar-brand font-weight-bolder text-light ml-5 mr-4 nav-text-head tractive-logo" href="/">Tractive</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="text-light font-weight-bold"  to="/">Home</Link>
            <Link className="text-light font-weight-bold"  to="/fleets">Fleets</Link>
            <Link className="text-light font-weight-bold"  to="/contact-us">Contact Us</Link>
            <Link className="text-light font-weight-bold"  to="/about">About Us</Link>
            <Link className="text-light font-weight-bold"  to="/post-fleet">Post Fleet</Link>

          {
            localStorage.JWT ? 
            <Nav.Link className="text-light font-weight-bold" onClick={this.logout}   href="/login">Logout</Nav.Link>
            // &&
            // <Nav.Link className="text-light font-weight-bold"  href="/update-profile">Update Profile</Nav.Link>
            :
            <NavDropdown className="text-white"  title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item className="text-success font-weight-bold"  href="/login-farmer">Farmer</NavDropdown.Item>
              <NavDropdown.Item className="text-success font-weight-bold"  href="/login-owner">Fleet Owner</NavDropdown.Item>
              <NavDropdown.Item className="text-success font-weight-bold"  href="/login-agent">Agent</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
             }

             {
                !localStorage.JWT && 
                // <Nav.Link className="text-light font-weight-bold" onClick={this.logout}   href="/login">Logout</Nav.Link>
                // &&
                // <Nav.Link className="text-light font-weight-bold"  href="/update-profile">Update Profile</Nav.Link>
                // :
               <NavDropdown className="text-white" bg="success"  title="Join Us" id="basic-nav-dropdown">
               <NavDropdown.Item className="text-success font-weight-bold"  href="/farmer-register">Farmer</NavDropdown.Item>
               <NavDropdown.Item className="text-success font-weight-bold"  href="/owner-register">Fleet Owner</NavDropdown.Item>
               <NavDropdown.Item className="text-success font-weight-bold" href="/agent-register">Agent</NavDropdown.Item>
               {/* <NavDropdown.Divider />
               <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
             </NavDropdown>

             }
            
          </Nav>
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