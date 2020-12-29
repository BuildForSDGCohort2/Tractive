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
        }
    }

    onSearch(event) {
        this.setState({ searchedValue: event.target.value });
    }
    componentDidMount = () => {
        this.getFleets();
      };

    getFleets = () => {
        const agent = localStorage.getItem("JWTA");
        const farmer = localStorage.getItem("JWTF");
        const owner = localStorage.getItem("JWTO");
        if(agent){
            axios.get('/fleets', {
                headers:{
                    "Authorization": `Bearer ${agent}`
                }

            })
              .then((response) => {
                const data = response.data;
                // alert(response.data)
                this.setState({ fleets: data });
                console.log('Data has been received!!');
              })
              .catch((error) => {
                // alert('Error retrieving data!!!');
                alert(error)
                console.log(error)
              });
        } if(farmer) {
            axios.get('/fleets', {
                headers:{
                    "Authorization": `Bearer ${farmer}`
                }

            })
              .then((response) => {
                const data = response.data;
                // alert(response.data)
                this.setState({ fleets: data });
                console.log('Data has been received!!');
              })
              .catch((error) => {
                // alert('Error retrieving data!!!');
                alert(error)
                console.log(error)
              });
        } if(owner){
            axios.get('/fleets', {
                headers:{
                    "Authorization": `Bearer ${owner}`
                }

            })
              .then((response) => {
                const data = response.data;
                // alert(response.data)
                this.setState({ fleets: data });
                console.log('Data has been received!!');
              })
              .catch((error) => {
                // alert('Error retrieving data!!!');
                alert(error)
                console.log(error)
              });
        }

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
        <p className="h2 text-success text-center mb-4">Search for fleets in matter of seconds</p>
    <Input style={search } className="mb-3" type="text" onChange={this.onSearch.bind(this)} value={this.state.searchedValue} placeholder="Search fleets such as tractor, sprayer etc."/>
        <div className="row d-flex justify-content-between ">
        {data.length > 0 ?
                    data.map((fleet, i) => {
            return (

                <Card style={style} key={fleet._id.toString()} className="mt-3">
                    <CardImg
                    alt="fleet-Image"
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
                        onClick={(e) => e.preventDefault()}
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
