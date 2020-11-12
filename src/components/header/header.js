import React, {Component} from 'react';
import './header.css'
import {Redirect } from 'react-router-dom'
import axios from 'axios'

// import {Link} from 'react-router-dom'
// import {Router,Redirect } from 'react-router-dom'
class Header extends Component{

    constructor(props) {
        super(props)
        this.state = {
            redirect:false
          }
        this.logout = this.logout.bind(this)
      }
      logout(e){
          e.preventDefault();
          const api = axios.create({
                baseURL:'/api/',
                headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
            })
        api.post('/logout')
        .then(  (response) => {
            localStorage.setItem('token','')
            localStorage.clear() 
            this.setState({redirect:true})
          })
          .catch(function (error) {
            // handle error
            alert("error");
          });

        //   console.log(this.props)
      }

    render(){

        if(this.state.redirect )
        {
            return (<Redirect to='/login'/>)
        }

        return (
            <div  className = 'header'>
                 <div className = 'header-bar' >   
                    <div className="nav-menu">
                        <ul>
                            <li><a  href='/question/read/1'>My Question</a></li>
                            <li><a href='/question/read/2'>All Question</a></li>
                            <li><a href='/question/create'>New Question</a></li>
                            <li><a href='/login'>Login</a></li>
                            <li><a href='/signup'>Signup</a></li>
                            <li><a href='/logout' onClick={this.logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header