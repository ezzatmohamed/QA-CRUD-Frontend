import React, {Component} from 'react';
import './NewQuestion.css'
// import {Link} from 'react-router-dom'
// import {Router,Redirect } from 'react-router-dom'
import axios from 'axios'
// import {Redirect } from 'react-router-dom'


class NewQuestion extends Component{

    constructor(props) {
        super(props)
        this.state = {
            redirect:false,
            content:""
          }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
      onSubmit(e){
        e.preventDefault()

        const api = axios.create({
            baseURL:'/api/',
            headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
        })
        
        api.post('/question/create',{
            content:this.state.content
        })
        .then(  (response) => {
                console.log(response);
                if(response.errors){
                    alert('invalid question')
                }   
                else{
                    alert('question added')
                }
              }
            
        );
        
    }
   
    render(){

        return (
            <div id="form-main">
                <div id="form-div">
                    <form class="form" id="form1"  onSubmit={this.onSubmit}>
                    
                                    
                    <p class="text">
                        <textarea name="content" onChange={this.onChange}   class="feedback-input" id="comment" placeholder="Your Question"></textarea>
                    </p>
                    
                    
                    <div class="submit">
                        <input type="submit" value="POST" id="button-blue"/>
                        <div class="ease"></div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewQuestion