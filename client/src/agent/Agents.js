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

export default class Agents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agents: [], 
            searchedValue: ''
        }
    }

    onSearch(event) {
        this.setState({ searchedValue: event.target.value });
    }
  
    componentDidMount = () => {
        this.getAgents();
      };
    
      getAgents = () => {
        const agent = localStorage.getItem("JWTA");
        const farmer = localStorage.getItem("JWTF");
        const owner = localStorage.getItem("JWTO");
        if(agent) {
            axios.get('/agents', {
                headers:{
                    "Authorization": `Bearer ${agent}`
                }   
            })
              .then((response) => {
                const data = response.data;
                this.setState({ agents: data });
                console.log('Data has been received!!');
              })
              .then(res => {
                console.log(res);
            })
              .catch((error) => {
                console.log(error)
              });
        } if (farmer){
            axios.get('/agents', {
                headers:{
                    "Authorization": `Bearer ${farmer}`
                }   
            })
              .then((response) => {
                const data = response.data;
                this.setState({ agents: data });
                console.log('Data has been received!!');
              })
              .then(res => {
                console.log(res);
            })
              .catch((error) => {
                console.log(error)
              });
        } if (owner){
            axios.get('/agents', {
                headers:{
                    "Authorization": `Bearer ${owner}`
                }   
            })
              .then((response) => {
                const data = response.data;
                this.setState({ agents: data });
                console.log('Data has been received!!');
              })
              .then(res => {
                console.log(res);
            })
              .catch((error) => {
                console.log(error)
              });
        }
       
      }

    render() {  
        let data = this.state.agents.filter(
            (agent) => {
                return agent.state.toLowerCase().indexOf(this.state.searchedValue.toLowerCase()) !== -1;
            }
         ); 
  return (
    <>
    <div className="container mt-5">
    <p className="h2 text-success text-center mb-4">Search for nearby agents and get work done faster</p>
    <Input style={search } className="mb-3" type="text" onChange={this.onSearch.bind(this)} value={this.state.searchedValue} placeholder="Search for nearby Agents by LOCATION"/>
        <div className="row d-flex justify-content-between ">

        {data.length > 0 ? 
                    data.map((agent) => {                        
            return (
                
                <Card style={style} key={agent._id.toString()} className="mt-2 mr-1 mb-3">
                    <CardImg
                    alt="..."
                    src={agent.image?agent.image:"/images/userC.png" }
                    top
                    ></CardImg>
                    <CardBody>
                    <CardTitle>{agent.fullName}</CardTitle>
                    <CardText>
                        {agent.phone}
                    </CardText>
                    <CardText>
                        {agent.email}
                    </CardText>
                    <CardText>
                        {agent.state}
                    </CardText>
                    <Button
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        Contact Agent
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