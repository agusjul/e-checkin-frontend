import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage/Homepage';
import Header from './components/Header/Header';
import Admin from './components/Admin/Adminpage';
import Back from './components/Back/Back';
import Form from './components/Formuser/Formuser';
import Mobile from './components/Mobile/Mobile';
import Logout from './components/Logout/Logout';
import Welcome from './components/Welcomepage/Welcome';
import ScanQR from './components/ScanQR/ScanQR';
import Notelepon from './components/Notlp/Notlp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component{
  state ={
    no : ""
  }

  addNumber = (e) => {
    this.setState({
      no : e
    })
    
  }

  render(){
    return(
      <Router>
        <Switch>
          <Route path="/admin">
            <Back/>
            <Admin/>
          </Route>
          <Route path="/logout">
            <Mobile/>
            <Logout/>
          </Route>
          <Route path="/user">
            <Mobile/>
            <Form tlp={this.state.no}/>
          </Route>
          <Route path="/notlp">
            <Notelepon tlp={this.state.no} number={this.addNumber}/>
           
          </Route>
          <Route path="/welcome">
            <Mobile/>
            <Welcome/>
          </Route>
          <Route path="/scanqr">
            <Header/>
            <ScanQR/>
          </Route>
          <Route path="/">
            <Header/>
            <Homepage/>
          </Route>
        </Switch>
      </Router>
      
    )
  }
}

export default App;
