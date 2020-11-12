import React, {Component} from 'react';
import './signup.css'
// import {Redirect } from 'react-router-dom'
import axios from 'axios'
// import {Redirect } from 'react-router-dom'

const api = axios.create({
    baseURL:'/api/'
})
class Signup extends Component{

    constructor(props) {
        super(props)
        this.state={
            email:'',
            password:'',
            name:'',
            redirect:false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }

      onChange(e){
          this.setState({[e.target.name]:e.target.value})
      }
      onSubmit(e){
        e.preventDefault()


        api.post('/signup',{
            email:this.state.email,
            name:this.state.name,
            password:this.state.password
        })
        .then(  (response) => {
                console.log(response);
                if(response.errors){
                    alert('error')
                }   
                else{
                    alert('success')
                }
              }
            
        );
    }
      
    render(){

        return (
            
            <div id="form-main">
                <div id="form-div">
                    <form class="form" id="form1"  onSubmit={this.onSubmit}>
                    
        
                    <p class="name">
                        <input name="name" type="text"  onChange={this.onChange}  class="feedback-input" placeholder="Name" id="name" />
                    </p>
                    <p class="name">
                        <input name="email" type="text" onChange={this.onChange}   class="feedback-input" placeholder="Email" id="name" />
                    </p>
                    <p class="name">
                        <input name="password" type="password"  onChange={this.onChange}  class="feedback-input" placeholder="Password" id="name" />
                    </p>
                    
                    <div class="submit">
                        <input type="submit" value="Signup" id="button-blue"/>
                        <div class="ease"></div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup