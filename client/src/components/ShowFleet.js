import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

export default class Fleet extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fleet: {},
      redirect: false
    }
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
      axios.get(`/fleets/${this.props.match.params.id}`)
      .then(res => {
        console.log(res)
          this.setState({ fleet: res.data })
      });
  }

  deleteUser(event) {
    event.preventDefault();
    console.log(this.state.fleet._id)
    axios.post(`/fleets/delete/${this.state.fleet._id}`)
      .then(res => {
        alert(res)
          this.setState({ redirect: this.state.redirect === false })
      });
  }

  render() {

    return (
      <div className="container text-center" style={{marginTop: "50px"}}>
        <div className="card text-center text-left">
          <div className="card-header text-center text-success h2">{this.state.fleet.name}</div>
              <div className="card-body"> 
                <div className="row">
                  <div className="col-lg-5">
                  <img className="img-thumbnail" style={{marginBottom: "10px"}} src={"/images/tractyJoin.png" } alt="fleet"/><br/>                                            
                  </div>
                  <div className="col-lg-5">
                  <p className="card-text font-weight-bold"> {this.state.fleet.desc}</p>
                  <p className="card-text "> {this.state.fleet.purpose}</p>
                  <p className="card-text text-success font-weight-bold"> The Payment per Acre is :  N{this.state.fleet.chargePerAcre}</p>
                  <br/>
                  <p className="card-text font-weight-bold text-success h5"> Owner's Detail</p>
                  <p className="card-text ">{this.state.fleet.ownerNumber}</p>
                  <p className="card-text "> {this.state.fleet.ownerEmail}</p>
                  <p className="card-text "> {this.state.fleet.ownerContact}</p>
                  <br/>
                    <p className="card-text font-weight-bold h4"><span className="text-success h4">{this.state.fleet.availability}</span> </p>                 
                  </div>
                </div>                                        
                  <hr/>
                  <div className="row text-center" style={{marginLeft: "500px"}}>

                  <button className="btn btn-lg btn-success"><a className="text-white" target="_blank" href="https://paystack.com/pay/fleetspayment">Make Request</a></button>
                    {/* <Link to="/https://paystack.com/pay/fleetspayment">
                      <button className="btn btn-lg btn-success">Make Request</button>
                    </Link>                   */}
                    {/* <Link to={this.state.fleet._id+"/edit"}>
                      <button className="btn btn-primary">Edit Fleet</button>
                    </Link>                   */}
                    {/* <form onSubmit={this.deleteUser}>
                      <button type="submit" className="btn btn-danger" style={{marginLeft: "10px"}}>Delete</button>
                    </form> */}
                  </div> 
                
                  {this.state.redirect && (
                    <Redirect to={'/fleet'}/>
                  )}

              </div>
          </div>
      </div>
    )
  }
}
// export default User;