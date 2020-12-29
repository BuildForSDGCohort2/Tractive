import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import userImg from '../assets/user1.png';
import Footer from "../components/Footer";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "../components/Profile.css";
toast.configure()

export default class ProfileFarmer extends Component {
      constructor(props) {
        super(props) 
        this.state = {
           title: "",
            fullName: "",
            gender: '',
            email: "",
            phone: "",
            address: "",
            town: "",
            state: "",
            country: "",
            farmSize: "",
            farmAddress: "",
            crops: "",
            password: "", 
            image: null,
            isLoading: true,
            message: null, 
            imageLoading: false,
            loadingUser: false,
            deleted: false,
            error: false,
            msg: null,
            redirect: false,
            updated: false,
            showMessage: false,
        }   
      }
    

  handleUpload=e=>{
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'zeeson1')
    this.setState({imageLoading:true})
    axios.post('https://api.cloudinary.com/v1_1/zeeson-info-tech-and-innovations/image/upload',data)
    .then(res=>{
      this.setState({
        image:res.data.secure_url,
        imageLoading:false
      })
    })
   }

   updateUser = async (e) => {
    const accessString = localStorage.getItem('JWTF');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
    const {
      title, fullName, gender,  email, phone, address,town,state,country,farmSize,farmAddress,crops, password,image,
    } = this.state;
    e.preventDefault();
    try {
      const response = await axios.put(
        '/farmers/updateUser',
        {
          title, fullName, gender,  email, phone, address,town,state,country,farmSize,farmAddress,crops, password,image,
        },
        {
          headers: { Authorization: `JWTF ${accessString}` },
        },
      );
      console.log(response.data);
      this.setState({
        showMessage: toast.success("Image updated successfully", {
          autoClose: 4000,
      }),
        updated: true,
        error: false,
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
  };

    async componentDidUpdate(){
      if(this.state.showMessage === true) {
        this.setState({
          showMessage: toast.success( `Welcome! ${this.state.title} ${this.state.fullName}`, {
            // position: toast.POSITION.TOP_LEFT,
            // autoClose: 10000,
          }),

        })
      }
    }

      async componentDidMount() {
        const accessString = localStorage.getItem('JWTF');
        const {
          match: {
            params: { email },
          },
        } = this.props;
        console.log(email);
        if (accessString == null) {
          this.setState({
            isLoading: false,
            error: true,
          });
        } else {
          try {
            const response = await axios.get('/farmers/find-user', {
              params: {
                email,
              },
              headers: { Authorization: `JWTF ${accessString}` },
            });
            this.setState({
              showMessage: true,
              title: response.data.title,
              fullName: response.data.fullName,
              gender: response.data.gender,
              email: response.data.email,
              phone: response.data.phone,
              address: response.data.address,
              town: response.data.town,
              state: response.data.state,
              country: response.data.country,
              farmSize: response.data.farmSize,
              farmAddress: response.data.farmSize,
              crops: response.data.crops,
              password: response.data.password,
              image: response.data.image,
              isLoading: false,
              error: false,
            });
          } catch (error) {
            console.error(error.response.data);
            this.setState({
              error: true,
            });
          } 
        } 
      }

      deleteUser = async (e) => {
        const accessString = localStorage.getItem('JWTF');
        const {
          match: {
            params: { email },
          },
        } = this.props;
        if (accessString === null) {
          this.setState({
            isLoading: false,
            error: true,
          });
        }
    
        e.preventDefault();
        try {
          const response = await axios.delete('/farmers/delete-user', {
            params: {
              email,
            },
            headers: { Authorization: `JWTF ${accessString}` },
          });
          console.log(response.data);
          localStorage.clear()
          this.setState({
            deleted: true,
          });
        } catch (error) {
          console.error(error.response.data);
          this.setState({
            error: true,
          });
        }
      };
    
      logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location = "/login-farmer"
      };


  render() {
    const {
      title,
      fullName,
      gender,
      email,
      phone,
      address,
      town,
      state,
      country,
      farmSize,
      farmAddress,
      crops,
      password, 
      image,
      msg,
      isLoading,
      deleted,
      error,
      showMessage,
    } = this.state;
  // const data = this.state.profiles
    if (error) {
      return (
        <div>
          <div className="mt-5">
           <h5>Problem fetching user data. Please login again.</h5> 
          </div>
          <NavLink to="/login-farmer">
              <button className="ml-2 h2 bg-success text-white">Login</button>
           </NavLink>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="text-success m-5">Loading User Data...</div>
        
      );
    }
    if (deleted) {
      return <Redirect to="/" />;
    }

    return (
        <div className="mt-5" >
          {/* <h1 className='text-center mb-5 text-success'>Welcome</h1>  */}
          <div className="row mt-5 mb-4">
            <div className="">
               {/* <h1 className='text-center text-success'>Welcome</h1>  */}
            </div>
            <div className="col-sm-12 col-lg-6 d-flex logout justify-content-center">
            {/* <NavLink
               className="text-success font-weight-bold" to="/agents">Contact nearby Agents
             </NavLink>  */}
              {/* <p onClick={this.logout} className="mr-3 text-success">
                <NavLink className="mr-3 text-success" to="/login-farmer">
                    Logout
                </NavLink>
              </p> */}
              <NavLink
                className="h5 ml-4 btn btn-success  text-white font-weight-bold" to="/farmers">Nearby Farmers
              </NavLink> 
              {/* <NavLink to={`/updateProfile/${email}`}>
                <p className="ml-3 text-success">Update Profile</p>
              </NavLink>
              <NavLink to={`/updatePassword/${email}`}
              >
                <p className="ml-3 text-success">Update Password</p>
              </NavLink> */}
            </div>
            <div className="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center">
            <NavLink
               className="h5 btn btn-success  text-white font-weight-bold" to= {localStorage.user?"/fleets":"/protect-route"}>Fleets
             </NavLink> 
             {/* <p className="text-dark">Get stream of fleets as fast as possible</p> */}

             <NavLink
               className="h5 ml-4 btn btn-success  text-white font-weight-bold" to="/agents">Nearby Agents
             </NavLink> 
            </div>
          </div>

          <div className="d-flex mb-5 justify-content-around profile-div">
            <div>
                  {/* {
                data.length ? data.map(profile=>{
                  return( */}
                    <div> 
                      <img className="img-thumbnail profile_image" src={image ? image : userImg} alt="user"/><br/>
                  {/* <p>id: {profile.id}</p> */}
                </div>
                    {/* )
                })
                : null
              } */}
              <br/>
               <form onSubmit={this.updateUser}>
                 <div>
                  <label className="mr-4">Update profile picture</label>
                <div>
                <input 
                className="ml-5"
                    type="file" 
                    name="image"
                    onChange={this.handleUpload}
                    />
                </div>
                 </div>
                 <button type="submit" className="btn btn-lg btn-success contactbtn mb-5 mr-5">Upload</button>
               </form>
            </div>
            <div>
               <p className="h2 font-weight-bold"> <span className="mr-3">{title}</span> {fullName}</p> 
               <div>
                  <p>{email}</p>
                  <p>{phone}</p>
                  <p>{farmAddress}</p>
                 
               </div>  
            </div> 
          </div>
          {/* <div className="row text-center bg-success">
            <div className="col-12 text-center">
            <p className=" text-white font-weight-bold mt-3 "> Copyright &copy; 2020 | Tractive Nigeria</p>
            </div>
        </div>  */}
          <Footer />
        </div>
        
        
      );
    }
  }

  ProfileFarmer.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }),
  };