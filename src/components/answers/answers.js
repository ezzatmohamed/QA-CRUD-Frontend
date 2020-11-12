
import Answer from './answer/answer'
import React, {Component} from 'react';
import './answers.css'
// import {Redirect } from 'react-router-dom'
import axios from 'axios'
// import {Redirect } from 'react-router-dom'

const api = axios.create({
    baseURL:'/api/',
    headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
})

class Answers extends Component{

    constructor(props) {
        super(props)
        this.state={
            id:parseInt(props.match.params.id),
            answers:[],
            content:"",
            redirect:false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
      componentWillMount(){
        
            api.get(`/answer/read/${this.state.id}`)
            .then((response)=>{
                this.setState({
                    answers:response.data.answers
                })
            })
       
      }

      onChange(e){
          this.setState({[e.target.name]:e.target.value})
      }
      
      onSubmit(e){
        e.preventDefault()


        api.post('/answer/create',{
            content:this.state.content,
            question_id:this.state.id
        })
        .then(  (response) => {
                console.log(response);

                if(response.errors){
                    alert('invalid answer')
                }   
                else{
                    alert('answer added ! refresh the pages')
                }
              }
            
        ).catch(function (error) {
            // handle error
            alert("error");
          });;
        
    }
    render(){

        return (
            
            <div id="answers-main" className="answers">
                <h1>Answers</h1>

                {
                    this.state.answers.map(answer=>{
                        return (<Answer key={answer.id} 
                                         info={answer} ></Answer>)
                    })
                }

                <div id="form-main">
                <div id="form-div">
                    <form class="form" id="form1" onSubmit={this.onSubmit}>
                        <p class="text">
                            <textarea name="content" onChange={this.onChange}  class="feedback-input" id="comment" placeholder="Your Answer"></textarea>
                        </p>
                        <div class="submit">
                            <input type="submit" value="POST" id="button-blue"/>
                            <div class="ease"></div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Answers