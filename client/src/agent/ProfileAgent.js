import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import PropTypes from 'prop-types';
import userImg from '../assets/user1.png';
import Footer from "../components/Footer";
import "../components/Profile.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "../components/Profile.css";
toast.configure()

export default class ProfileAgent extends Component {
      constructor(props) {
        super(props);

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
            education: "",
            employmentStatus: "", 
            cvLink: "", 
            password: "", 
            image: null,
            isLoading: true,
            loadingUser: false,
            deleted: false,
            error: false,
            imageUrl: null,
            uploading: false,
            showMessage: false
        };
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
        const accessString = localStorage.getItem('JWT');
        if (accessString === null) {
          this.setState({
            loadingUser: false,
            error: true,
            showMessage: true,
          });
        }
        const {
          title, fullName, gender,  email,   phone, education, employmentStatus, cvLink, address, town, state,country,  password, image,
    } = this.state;
        e.preventDefault();
        try {
          const response = await axios.put(
            '/agents/updateUser',
            {
              title, fullName, gender,  email,   phone, education, employmentStatus, cvLink, address, town, state,country,  password, image,
            },
            {
              headers: { Authorization: `JWT ${accessString}` },
            },
          );
          console.log(response.data);
          this.setState({
            showMessage: toast.success("Image updated successfully", {
              autoClose: 4000,
          }),
            updated: true,
            error: false,
            showMessage: true,
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

            }),
          })
        }
      }
      async componentDidMount() {
        const accessString = localStorage.getItem('JWT');
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
            const response = await axios.get('/agents/find-user', {
              params: {
                email,
              },
              headers: { Authorization: `JWT ${accessString}` },
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
              education: response.data.education,
              employmentStatus: response.data.employmentStatus, 
              cvLink: response.data.cvLink, 
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
        const accessString = localStorage.getItem('JWT');
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
          const response = await axios.delete('/agents/delete-user', {
            params: {
              email,
            },
            headers: { Authorization: `JWT ${accessString}` },
          });
          console.log(response.data);
          localStorage.removeItem('JWT');
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
        localStorage.removeItem('JWT');
      };

      handleFileDrop = (files) => {
        this.setState({
          imageUrl: null,
          image: files[0],
        });
      }
    
    

  render() {
    const {
      title,
      fullName,
      email,
      phone,
      education,
      address,
      town,
      state,
      country,
      password, 
      isLoading,
      deleted,
      error,
      image,
      imageUrl,
      uploading,
      showMessage,
    } = this.state;
    if (error) {
      return (
        <div>
          <div className="mt-5">
           <h5>Problem fetching user data. Please login again.</h5> 
          </div>
          <NavLink to="/login-agent">
              <button className="ml-2 h2 bg-success text-white">Login</button>
           </NavLink>
           <br/>
           <br/>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="text-success">Loading User Data...</div>
        
      );
    }
    if (deleted) {
      return <Redirect to="/" />;
    }

    return (
      <div className="mt-5" >
      {/* <h1 className='text-center mb-5 text-success'>Welcome</h1>  */}
      <div className="row mb-4">
        <div className="">
           {/* <h1 className='text-center text-success'>Welcome</h1>  */}
        </div>
        <div className="col-sm-12 col-lg-6 d-flex logout justify-content-center">
        {/* <NavLink
           className="text-success font-weight-bold" to="/agents">Contact nearby Agents
         </NavLink>  */}
          <p onClick={this.logout} className="mr-3 text-success">
            <NavLink className="mr-3 text-success" to="/login-agent">
                Logout
            </NavLink>
          </p>

          <NavLink to={`/updateProfile/${email}`}>
            <p className="ml-3 text-success">Update Profile</p>
          </NavLink>
          <NavLink to={`/updatePassword/${email}`}
          >
            <p className="ml-3 text-success">Update Password</p>
          </NavLink>
        </div>
        <div className="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center">
        <NavLink
           className="h5 btn btn-success  text-white font-weight-bold" to="/fleets">Fleets
         </NavLink> 
         {/* <p className="text-dark">Get stream of fleets as fast as possible</p> */}

         <NavLink
           className="h5 ml-4 btn btn-success  text-white font-weight-bold" to="/farmers">Nearby Farmers
         </NavLink> 
        </div>
      </div>

      <div className="d-flex mb-5 justify-content-around profile-div">
        <div>
        <img className="img-thumbnail profile_image" src={image ? image :  userImg} alt="user"/><br/>
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
               { showMessage &&  
                        <div >
                            <FlashMessage duration={5000}>
                                <strong className="text-success h4">Image Uploaded successfully</strong>
                            </FlashMessage>
                   </div>
                }
                    
        </div>
        <div>
           <p className="h2 font-weight-bold"> <span className="mr-3">{title}</span> {fullName}</p> 
           <div>
              <p>{email}</p>
              <p>{phone}</p>
              <p>{address}</p>
             
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

  ProfileAgent.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }),
  };