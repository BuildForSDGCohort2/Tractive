import React, { Component } from "react";
import axios from "axios"; 

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

export default class Fleets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fleets: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:2020/fleets")
        .then(res => {
            console.log(res)
            this.setState({ 
                // fleets: res.data,
                // fleets: res.data[0].fleets,
                fleets: res.data.map(fleet => fleet),
                fleet: res.data[0]
            })
        });  
    }

    render() {  
        const data = this.state.fleets 
  return (
    <>
    <div className="container mt-5">
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