import React, {Component} from 'react';
import './login.css'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {Redirect } from 'react-router-dom'

const api = axios.create({
    baseURL:'/api/'
})
// import {Redirect } from 'react-router-dom'

class Login extends Component{

    constructor(props) {
        super(props)
        this.state={
            email:'',
            password:'',
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


        // api.get('/question/read-all',{
        //     email:"this.state.email",
        //     password:"this.state.password"
        // })
        
        api.post('/login',{
            email:this.state.email,
            password:this.state.password
        })
        .then(  (response) => {
                console.log(response);
                if(response.data.message){
                    alert('invalid login')
                }   
                else{
                    console.log(response.data.token)
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('id',response.data.user.id)
                    this.setState({
                        redirect:true
                    })
                }
              }
            
        ).catch(function (error) {
            // handle error
            alert("error");
          });
        
    }
      
    render(){

        if(this.state.redirect )
        {
            return (<Redirect to='/question/read/2'/>)
        }
        return (
            
            <div id="form-main">
                <div id="form-div">
                    <form class="form" id="form1" onSubmit={this.onSubmit}>
                    
                    <p class="name">
                        <input name="email" type="text" class="feedback-input" onChange={this.onChange} placeholder="Email" id="name" />
                    </p>
                    <p class="name">
                        <input name="password" type="password" class="feedback-input" onChange={this.onChange} placeholder="Password" id="name" />
                    </p>
                    
                        <input type="submit" value="LOGIN" id="button-blue"/>
                        <div class="ease"></div>
                   
                    </form>
                </div>
            </div>
        )
    }
}

export default Login