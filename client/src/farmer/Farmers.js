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
  
    componentDidMount = () => {
        this.getFarmers();
      };
    
    getFarmers = () => {
        axios.get('/farmers', {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem('JWT')}`
            }
            
        })
          .then((response) => {
            const data = response.data;
            // alert(response.data)
            this.setState({ farmers: data });
            console.log('Data has been received!!');
          })
          .catch((error) => {
            // alert('Error retrieving data!!!');
            // alert(error)
            console.log(error)
          });
      }

    render() {  
        // const data = this.state.fleets; 
        const data = this.state.farmers.filter(
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
                    data.map((farmer, i) => {                        
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