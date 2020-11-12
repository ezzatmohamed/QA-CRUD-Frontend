import React, {Component} from 'react';
import './question.css'
import axios from 'axios'
// import {Link} from 'react-router-dom'
// import {Router,Redirect } from 'react-router-dom'
class Question extends Component{

    constructor(props) {
        super(props)
        this.state = {
            info:props.info,
            type:props.type,
            redirect:false
          }

        this.deleteQuestion = this.deleteQuestion.bind(this)
      }

      deleteQuestion(){
        const api = axios.create({
            baseURL:'/api/',
            headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
        })

        api.post(`/question/delete/${this.state.info.id}`)
            .then((response)=>{
                if(response.errors){
                    alert('invalid delete')
                }   
                else{
                    alert('question deleted ! refresh the page ')
                }
            }).catch(function (error) {
                // handle error
                alert("error");
              })
      }
   
    render(){

        return (
            <div  className = 'question'>
                <a href={`/answer/read/${this.state.info.id}`}><p>{this.state.info.content}</p></a>
                { this.state.info.user_id == localStorage.getItem('id') ? <div><button onClick={this.deleteQuestion} id ="delete-button">Delete</button> <a href={`/question/update/${this.state.info.id}`}><button id ="update-button">Update</button></a></div> : ''}
            </div>
        )
    }
}

export default Question