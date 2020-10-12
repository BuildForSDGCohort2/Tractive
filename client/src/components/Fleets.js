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
import { error } from "console";

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
        axios.get('/fleets')
          .then((response) => {
            const data = response.data;
            this.setState({ fleets: data });
            console.log('Data has been received!!');
          })
          .catch((error) => {
            alert('Error retrieving data!!!', + error);
          });
      }

    // componentDidMount() {
    //     axios.get("/fleets")
    //     .then(res => {
    //         console.log(res)
    //         this.setState({ 
    //             // fleets: res.data,
    //             // fleets: res.data[0].fleets,
    //             fleets: res.data.map(fleet => fleet),
    //             fleet: res.data[0]
    //         })
    //     });  
    // }

render() {  
        // const data = this.state.fleets.filter(
        //     (fleet) => {
        //         return fleet.name.toLowerCase().indexOf(this.state.searchedValue.toLowerCase()) !== -1;
        //     }
        //  ); 

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
                    alt="..."
                    src={"/images/tractyJoin.png" }
                    top
                    ></CardImg>
                    <CardBody>
                    <CardTitle>{fleet.name}</CardTitle>
                    <CardText>
                        {fleet.desc}
                    </CardText>
                    <Button
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        Contact the Owner
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