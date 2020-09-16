// navbar component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";


export default class Navbar extends Component {
  render() {
    return (

<nav className="navbar navbar-expand-lg navbar-light bg-success shadow mobile-color">
    <div className="container">
      <a className="navbar-brand font-weight-bolder text-light nav-text-head tractive-logo" href="/" >Tractive</a>
      <button 
          className="navbar-toggler " 
          type="button" data-toggle="collapse" 
          data-target="#navbarResponsive" 
          aria-controls="navbarResponsive" 
          aria-expanded="false" 
          aria-label="Toggle navigation" 
        >
            <span className="navbar-toggler-icon bg-white"></span>
          </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        
        <form className="form-inline ml-auto" onSubmit={this.onSubmit}>
          <div>
          <input className="form-control mr-sm-2" type="text"  placeholder="Search Fleets" />
                  <button type="submit" className="btn btn-outline-light">Search</button>
          </div>
        </form>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
                    <NavLink
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/fleets">Fleets
                        <span class="sr-only">(current)</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        className="nav-link text-light font-weight-bold" activeClassName="is-active" to="/contact-us">Contact Us
                    </NavLink>               
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light font-weight-bold " to="/about">About Us
                    </Link>               
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light font-weight-bold" to="/post-fleet">Post Fleet
                    </Link>               
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light font-weight-bold" to="/join-us">Join Us
                    </Link>               
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light font-weight-bold" to="/login">Login
                    </Link>               
                </li>
               
        </ul>
      </div>
    </div>
  </nav>
    );
  }
}