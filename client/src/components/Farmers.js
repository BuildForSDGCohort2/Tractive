import React, { Component } from "react";
import axios from "axios"; 
import { Input } from 'reactstrap';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";

const style = { 
    width: "14rem"
 };

 const search = {
     height: "60px" 
 }

export default class Farmers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            farmers: [], 
            searchedValue: ''
        }
       
    }

    onSearch(event) {
        this.setState({ searchedValue: event.target.value });
    }
  
    componentDidMount() {
        axios.get("/farmers")
        .then(res => {
            console.log(res)
            this.setState({ 
                // agents: res.data
                // fleets: res.data[0].fleets,
                farmers: res.data.map(farmer => farmer),
                farmer: res.data[0]
            })
        });  
    }

    render() {  
        let data = this.state.farmers.filter(
            (farmer) => {
                return farmer.state.toLowerCase().indexOf(this.state.searchedValue.toLowerCase()) !== -1;
            }
         ); 
  return (
    <>
    <div className="container mt-5">
    <p className="h2 text-success text-center mb-4">Search for nearby farmers and get work done faster</p>
    <Input style={search } className="mb-3" type="text" onChange={this.onSearch.bind(this)} value={this.state.searchedValue} placeholder="Search for nearby Farmers by LOCATION"/>
        <div className="row d-flex justify-content-between ">

        {data.length > 0 ? 
                    data.map((farmer) => {                        
            return (
                
                <Card style={style} key={farmer._id.toString()} className="mt-2 mr-1 mb-3">
                    <CardImg
                    alt="..."
                    src={"/images/userC.png" }
                    top
                    ></CardImg>
                    <CardBody>
                    <CardTitle>{farmer.fullName}</CardTitle>
                    <CardText>
                        {farmer.phone}
                    </CardText>
                    <CardText>
                        {farmer.email}
                    </CardText>
                    <CardText>
                        {farmer.town} 
                    </CardText>
                    <Button
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        Contact Farmer
                    </Button>
                    </CardBody>
                </Card>
            )}                       
         ) : null} 


        </div>

    </div>
      
    </>
  );
}
}