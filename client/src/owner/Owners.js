import React, { Component } from "react";
import axios from "axios"; 
import { Input } from 'reactstrap';
import { NavLink} from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";

const style = { width: "14rem" };
const search = { height: "60px"};

// production error (fetching data from database) is due to build in the app file
// i have spent more than 1 week debugging it

export default class Owners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [],
            searchedValue: ''
        };
    }

    onSearch(event) {
        this.setState({ searchedValue: event.target.value });
    }
    componentDidMount = () => {
        this.getOwners();
      };
    
    getOwners = () => {
        const agent = localStorage.getItem("JWTA");
        const farmer = localStorage.getItem("JWTF");
        const owner = localStorage.getItem("JWTO");
        if(agent){
            axios.get('/owners', {
                headers:{
                    "Authorization": `Bearer ${agent}`
                }
                
            })
              .then((response) => {
                const data = response.data;
                // alert(response.data)
                this.setState({ owners: data });
                console.log('Data has been received!!');
              })
              .then(res => {
                // localStorage.setItem('authorization', res.token);
                console.log(res);
            })
              .catch((error) => {
                // alert('Error retrieving data!!!');
                // alert(error)
                console.log(error)
              });
        } else if(farmer){
            axios.get('/owners', {
                headers:{
                    "Authorization": `Bearer ${farmer}`
                }
                
            })
              .then((response) => {
                const data = response.data;
                // alert(response.data)
                this.setState({ owners: data });
                console.log('Data has been received!!');
              })
              .then(res => {
                // localStorage.setItem('authorization', res.token);
                console.log(res);
            })
              .catch((error) => {
                // alert('Error retrieving data!!!');
                // alert(error)
                console.log(error)
              });
          
        } else if(owner) {
            axios.get('/owners', {
                headers:{
                    "Authorization": `Bearer ${owner}`
                }
                
            })
              .then((response) => {
                const data = response.data;
                // alert(response.data)
                this.setState({ owners: data });
                console.log('Data has been received!!');
              })
              .then(res => {
                // localStorage.setItem('authorization', res.token);
                console.log(res);
            })
              .catch((error) => {
                // alert('Error retrieving data!!!');
                // alert(error)
                console.log(error)
              });
        }
    }
        

render() {  
    // const data = this.state.fleets; 
        const data = this.state.owners.filter(
            (owner) => {
                return owner.fullName.toLowerCase().indexOf(this.state.searchedValue.toLowerCase()) !== -1;
            }
         ); 

  return (
    <>
    <div className="container mt-5">
        <p className="h2 text-success text-center mb-4">Search for Fleet owners in matter of seconds</p>
    <Input style={search } className="mb-3" type="text" onChange={this.onSearch.bind(this)} value={this.state.searchedValue} placeholder="Search fleet owners"/>
        <div className="row d-flex justify-content-between ">

        {data.length > 0 ? 
                    data.map((owner, i) => {                        
                        return (

                <Card style={style} key={owner._id.toString()} className="mt-3">
                    <CardImg
                    alt="..."
                    src={owner.image ? owner.image : "/images/userC.png" }
                    top
                    ></CardImg>
                    <CardBody>
                    <CardTitle>{owner.fullName}</CardTitle>
                    <CardText>
                        {owner.email}
                    </CardText>
                    <CardText>
                        {owner.phone}
                    </CardText>
                    {/* <NavLink to={"/fleet/"+fleet._id}>
                    <Button
                        color="success"
                    >
                        Contact Owner
                        </Button>
                    </NavLink> */}
                    
                   
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