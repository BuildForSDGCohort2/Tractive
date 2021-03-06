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

export default class Fleets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fleets: [],
            searchedValue: ''
        };
    }

    onSearch(event) {
        this.setState({ searchedValue: event.target.value });
    }
    componentDidMount = () => {
        this.getFleets();
      };
    
    getFleets = () => {
        axios.get('/fleets', {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem('JWT')}`
            }
            
        })
          .then((response) => {
            const data = response.data;
            this.setState({ fleets: data });
            console.log('Data has been received!!');
          })
          .then(res => {
            console.log(res);
        })
          .catch((error) => {
            console.log(error)
          });
      }

render() {  
    // const data = this.state.fleets; 
        const data = this.state.fleets.filter(
            (fleet) => {
                return fleet.name.toLowerCase().indexOf(this.state.searchedValue.toLowerCase()) !== -1;
            }
         ); 

  return (
    <>
    <div className="container mt-5">
        <p className="h1 text-success text-center mb-4">Welcome to the <span className="Display-3"> Market Place </span> </p>
        <p className="h2 text-success text-center mb-4">Search for fleets or produce in a matter of seconds</p>
    <Input style={search } className="mb-3" type="text" onChange={this.onSearch.bind(this)} value={this.state.searchedValue} placeholder="Search for fleets or produce such as Tractor or Onions "/>
        <div className="row d-flex justify-content-between ">

        {data.length > 0 ? 
                    data.map((fleet, i) => {                        
                        return (

                <Card style={style} key={fleet._id.toString()} className="mt-3">
                    <CardImg
                    alt="..."
                    src={fleet.image?fleet.image:"/images/tractyJoin.png" }
                    top
                    ></CardImg>
                    <CardBody>
                    <CardTitle>{fleet.name}</CardTitle>
                    <CardText>
                        {fleet.desc}
                    </CardText>
                    <CardText>
                        {fleet.availability}
                    </CardText>
                    <NavLink to={"/fleet/"+fleet._id}>
                    <Button
                        color="success"
                    >
                        Contact the Owner
                        </Button>
                    </NavLink>
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
