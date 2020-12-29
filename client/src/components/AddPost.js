import React, {Component} from "react";
import axios from "axios"; 
import { Redirect } from 'react-router';

class AddPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            purpose: "",
            purpose: "",
            availability: "", 
            redirect: false
        }
    }
}
