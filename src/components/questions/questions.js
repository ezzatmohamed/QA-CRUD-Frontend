
import Question from './../question/question'
import React, {Component} from 'react';
import './../answers/answers.css'
import axios from 'axios'
// import {Redirect } from 'react-router-dom'



class Questions extends Component{

    
    constructor(props) {
        super(props)
        this.state={
            id:parseInt(props.match.params.id),
            questions:[],
            redirect:false
        }
        this.onChange = this.onChange.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)

      
      }
      componentWillMount(){
        const api = axios.create({
            baseURL:'/api/',
            headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}
        })
        
        if(this.state.id == 2)
        {
            api.get('/question/read-all')
            .then((response)=>{
                this.setState({
                    questions:response.data.questions
                })
            })
        }
        else{
            api.get('/question/read-mine')
            .then((response)=>{
                this.setState({
                    questions:response.data.questions
                })
            })
        }
      }
      onChange(e){
          this.setState({[e.target.name]:e.target.value})
      }
      
      
    render(){

        return (
            
            <div id="answers-main" className="answers">
                <h1>Questions</h1>
                {
                    
                    this.state.questions && this.state.questions.map(question=>{
                        return (<Question key={question.id} 
                                          type={this.state.id}
                                         info={question} ></Question>)
                    })
                }
                
            </div>
        )
    }
}

export default Questions