import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'
import "./AboutUs.css";
// import Navbar from './Navbar';
import Footer from "./Footer";

export default class AboutUs extends Component {
  render() {
    return (
            <div className="">
            <section className="hero_contact">
            <div className="container-fluid">
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-white font-weight-bold mt-5">
                <h1 className="mt-5 display-3">Kindly glance through what we do and how we do it</h1>
                    <h3 className="display-2 text-success mt-5">About Us</h3> 
                </div>
                </div>
            </div>
            </section>
            <div className="container-fluid mt-5">
         <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5 ml-5 aboutus_row1">
                    <p className="h2 mt-5 font-weight-bold way_work">The Way We Work</p>
                    <p className="h1 font-weight-bold">We Live For <span className="text-success">Growth</span></p>
                    <p className="h1 font-weight-bold">  Work For Farmers</p>

                    <p> We are a team of passionate and commited youths, dedicated in solving the problem of mechanized agriculture by;</p>
                    <p> <span> <img src="images/bullet.png" alt="" /> </span>Connecting farmers to tractors and Implements</p>
                    <p className="mt-4"> <span> <img src="images/bullet.png" alt="" /> </span>Helping fleet owners get clients </p>
                    <p  className="mt-4"  > <span> <img src="images/bullet.png" alt="" /> </span> Providing jobs for our youths </p>
                    <br/>
                     <NavLink to="">
                      <button className="btn btn-success btn-large morebtn">Get started »</button>
                    </NavLink> 
            </div>  
            <div className="col-sm-12 col-lg-12 col-xl-6">
                <img className="m-4" src="/images/trac.png" alt="" />
         </div>
        </div>
    </div>
    <Carousel>
        <Carousel.Item>
            <div className="row testimony">
                <div className="col-3"></div>
                <div className="col-3 mt-5  justify-content-center">
                <p className="h5 mb-3 user-testimony"> <span> <img src="images/quote.png" alt="" /> </span> I was amazed at the amount of work they have done </p>
                   <p className="font-weight-bold"> Bola Ahmed</p>
                   <p className=""> Bluesense</p>
                    
                </div>
                <div className="col-3 mt-5 justify-content-center">
                   <img
                        className="d-block w-10"
                        src="images/user.png"
                        alt="First slide"
                    />
                </div>
                <div className="col-3"></div>
            </div>          
        </Carousel.Item>
        <Carousel.Item>
        <div className="row testimony">
                <div className="col-3"></div>
                <div className="col-3 mt-5  justify-content-center">
                <p className="h5 mb-3 user-testimony"> <span> <img src="images/quote.png" alt="" /> </span> I was amazed at the amount of work they have done </p>
                   <p className="font-weight-bold"> Bola Ahmed</p>
                   <p className=""> Bluesense</p>
                    
                </div>
                <div className="col-3 mt-5 justify-content-center">
                   {/* <p className="mb-3"> We connect farmers looking for tractors with tractor owners looking for work</p> */}
                   <img
                        className="d-block w-10"
                        src="images/user.png"
                        alt="First slide"
                    />
                </div>
                <div className="col-3"></div>
            </div>
         </Carousel.Item>
        <Carousel.Item>
        <div className="row testimony">
                <div className="col-3"></div>
                <div className="col-3 mt-5  justify-content-center">
                <p className="h5 mb-3 user-testimony"> <span> <img src="images/quote.png" alt="" /> </span> I was amazed at the amount of work they have done </p>
                   <p className="font-weight-bold mb-4"> Bola Ahmed</p>
                   <p className=""> Bluesense</p>
                    
                </div>
                <div className="col-3 mt-5 justify-content-center">
                   {/* <p className="mb-3"> We connect farmers looking for tractors with tractor owners looking for work</p> */}
                   <img
                        className="d-block w-10"
                        src="images/user.png"
                        alt="First slide"
                    />
                </div>
                <div className="col-3"></div>
            </div>
        </Carousel.Item>
        
        <Carousel.Item>
        <div className="row testimony">
                <div className="col-3"></div>
                <div className="col-3 mt-5  justify-content-center">
                   <p className="h5 mb-3 user-testimony"> <span> <img src="images/quote.png" alt="" /> </span> I was amazed at the amount of work they have done </p>
                   <p className="font-weight-bold mb-4"> Bola Ahmed</p>
                   <p className=""> Bluesense</p>
                    
                </div>
                <div className="col-3 mt-5 justify-content-center">
                   {/* <p className="mb-3"> We connect farmers looking for tractors with tractor owners looking for work</p> */}
                   <img
                        className="d-block w-10"
                        src="images/user.png"
                        alt="First slide"
                    />
                </div>
                <div className="col-3"></div>
            </div>
        
        </Carousel.Item>
      </Carousel>
      <br/>
     
      <div className="mt-5">
            <img className="mt-5" src="/images/line1.png" alt="" />
            <p className="h2 font-weight-bold">Meet The Team</p>
      <Carousel>
        <Carousel.Item>
        <div className="row team">
            <div className="col-2"></div>

                <div className="col-3 mt-5 justify-content-center">
                   {/* <p className="mb-3"> We connect farmers looking for tractors with tractor owners looking for work</p> */}
                   <img
                        className="d-block w-10"
                        src="images/co-founder.png"
                        alt="First slide"
                    />
                </div>
                
                 <div className="col-2"></div>
                 <div className="col-3 mt-5  justify-content-center">
                   <p className="h4 mb-3 user-testimony font-weight-bold"> Adebisi Johnson</p>
                   <p className="mb-4"> Co-Founder & Design Lead</p>
                   <p className=""> A research-driven product designer and business analyst that is determined to solve the problem of agriculture in africa.</p>
                   <p className=""> Our goal is not to sell as many tractors as possible, but to bring tractors to as many hectares of land as possible.</p>
                    
                </div>
            </div>        
        </Carousel.Item>
        <Carousel.Item>
        <div className="row team">
            <div className="col-2"></div>

                <div className="col-3 mt-5 justify-content-center">
                   {/* <p className="mb-3"> We connect farmers looking for tractors with tractor owners looking for work</p> */}
                   <img
                        className="d-block w-10"
                        src="images/co-founder.png"
                        alt="First slide"
                    />
                </div>
                
                 <div className="col-2"></div>
                 <div className="col-3 mt-5  justify-content-center">
                   <p className="h4 mb-3 user-testimony font-weight-bold "> Adebisi Johnson</p>
                   <p className=" mb-4"> Co-Founder & Design Lead</p>
                   <p className=""> A research-driven product designer and business analyst that is determined to solve the problem of agriculture in africa.</p>
                   <p className=""> Our goal is not to sell as many tractors as possible, but to bring tractors to as many hectares of land as possible.</p>
                    
                </div>
            </div>        
         </Carousel.Item>
        <Carousel.Item>
        <div className="row team">
            <div className="col-2"></div>

                <div className="col-3 mt-5 justify-content-center">
                   {/* <p className="mb-3"> We connect farmers looking for tractors with tractor owners looking for work</p> */}
                   <img
                        className="d-block w-10"
                        src="images/co-founder.png"
                        alt="First slide"
                    />
                </div>
                
                 <div className="col-2"></div>
                 <div className="col-3 mt-5  justify-content-center">
                   <p className="h4 mb-3 user-testimony font-weight-bold  "> Adebisi Johnson</p>
                   <p className="mb-4"> Co-Founder & Design Lead</p>
                   <p className=""> A research-driven product designer and business analyst that is determined to solve the problem of agriculture in africa.</p>
                   <p className=""> Our goal is not to sell as many tractors as possible, but to bring tractors to as many hectares of land as possible.</p>
                    
                </div>
            </div>        
        </Carousel.Item>
        
        <Carousel.Item>
        <div className="row team mb-2">
            <div className="col-2"></div>

                <div className="col-3 mt-5 justify-content-center">
                   {/* <p className="mb-3"> We connect farmers looking for tractors with tractor owners looking for work</p> */}
                   <img
                        className="d-block w-10"
                        src="images/co-founder.png"
                        alt="First slide"
                    />
                </div>
                
                 <div className="col-2"></div>
                 <div className="col-3 mt-5  justify-content-center">
                   <p className="h4 mb-3 user-testimony font-weight-bold "> Adebisi Johnson</p>
                   <p className="mb-4"> Co-Founder & Design Lead</p>
                   <p className=""> A research-driven product designer and business analyst that is determined to solve the problem of agriculture in africa.</p>
                   <p className=""> Our goal is not to sell as many tractors as possible, but to bring tractors to as many hectares of land as possible.</p>
                    
                </div>
            </div>        
        
        </Carousel.Item>
      </Carousel> 
      </div>
      <div>
          
    </div>
    <div>
        
    </div>
    <Footer />
</div> 

    );
  }
}