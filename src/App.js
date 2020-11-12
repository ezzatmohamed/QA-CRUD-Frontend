
import './App.css';

import Header from './components/header/header'
import Question from './components/question/question'
import NewQuestion from './components/NewQuestion/NewQuestion'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import Answers from './components/answers/answers'
import UpdateAnswer from './components/answers/answer/update/update'
import UpdateQuestion from './components/question/update/update'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router'
import {AuthRoute,NotAuthRoute} from './protected.route'
import Questions from './components/questions/questions';


function App() {
  return (

    <Router>
      <div className="App">
          <Header></Header> 
          <Switch>
                <NotAuthRoute path={['/login','/']} exact  component={Login}/>
                <NotAuthRoute path='/signup' exact component={Signup}/>
                <AuthRoute path='/question/create' exact component={NewQuestion}/>
                <AuthRoute path='/question/update/:id' exact component={UpdateQuestion}/>
                <AuthRoute path='/answer/update/:id' exact component={UpdateAnswer}/>
                <AuthRoute path='/question/read/:id' exact component={Questions}/>
                <AuthRoute path='/answer/read/:id' exact component={Answers}/>

            {/* <Question></Question> */}
          </Switch>
      </div>
    </Router>
  );
}

export default App;
