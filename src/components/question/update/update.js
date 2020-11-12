import React, {Component} from 'react';
// import './NewQuestion.css'
// import {Link} from 'react-router-dom'
// import {Router,Redirect } from 'react-router-dom'

import axios from 'axios'

class UpdateQuestion extends Component{

    constructor(props) {
        super(props)
        this.state = {
            id:parseInt(props.match.params.id),
            content:"",
            redirect:false
          }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
      onSubmit(e){
        e.preventDefault()

        const api = axios.create({
            baseURL:'/api/',
            headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
        })
        
        api.post(`/question/update/${this.state.id}`,{
            content:this.state.content
        })
        .then(  (response) => {
                console.log(response);
                if(response.errors){
                    alert('invalid update')
                }   
                else{
                    alert('question updated')
                }
              }
            
        );
        
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render(){

        return (
            <div id="form-main">
                <div id="form-div">
                    <form class="form" id="form1"   onSubmit={this.onSubmit} >
                    
                                    
                    <p class="text">
                        <textarea name="content" onChange={this.onChange}   class="feedback-input" id="comment" placeholder="Your Question"></textarea>
                    </p>
                    
                    <div class="submit">
                        <input type="submit" value="Update" id="button-blue"/>
                        <div class="ease"></div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdateQuestion