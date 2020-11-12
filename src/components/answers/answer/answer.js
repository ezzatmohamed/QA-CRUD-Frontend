import React, {Component} from 'react';
import './answer.css'
// import {Redirect } from 'react-router-dom'
import axios from 'axios'
// import {Redirect } from 'react-router-dom'

const api = axios.create({
    baseURL:'/api/',
    headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
})


class Answer extends Component{

    constructor(props) {
        super(props)
        this.state={
            info:props.info,
            redirect:false
        }
        this.onChange = this.onChange.bind(this)
        this.deleteAnswer = this.deleteAnswer.bind(this)
      }

      deleteAnswer(){
        const api = axios.create({
            baseURL:'/api/',
            headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
        })

        api.post(`/answer/delete/${this.state.info.id}`)
            .then((response)=>{
                if(response.errors){
                    alert('invalid delete')
                }   
                else{
                    alert('answer deleted ! refresh the page ')
                }
            }).catch(function (error) {
                // handle error
                alert("error");
              })
      }
   
      onChange(e){
          this.setState({[e.target.name]:e.target.value})
      }
      
    render(){

        return (
            
            <div id="answer-main" className="answer">
                <div id="answer-div">
                    <p className="name">{this.state.info.content}</p>

                 { localStorage.getItem('id') == this.state.info.user_id ? <div><button onClick={this.deleteAnswer} id ="delete-button">Delete</button> <a href={`/answer/update/${this.state.info.id}`}><button id ="update-button">Update</button></a></div> : ''}
 
                </div>
            </div>
        )
    }
}

export default Answer