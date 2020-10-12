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
          .catch(() => {
            alert('Error retrieving data!!!');
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

    displayFleets = (fleets) => {

        if (!fleets.length) return null;
    
        return fleets.map((fleet, index) => (
             <Card style={style} key={index} key={fleet._id.toString()} className="mt-3">
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
        ));
      }

render() {  
    // const data = this.state.fleets; 
        // const data = this.state.fleets.filter(
        //     (fleet) => {
        //         return fleet.name.toLowerCase().indexOf(this.state.searchedValue.toLowerCase()) !== -1;
        //     }
        //  ); 

  return (
    <div className="">
    {this.displayFleets(this.state.fleets)}
  </div>
  );
}
}