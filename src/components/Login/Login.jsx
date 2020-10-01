import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import styles from './Login.module.css';
import axios from 'axios';
import { withRouter } from "react-router";
class Logincomponent extends React.Component{
    state ={
        show : false,
        username : "",
        password : ""
    }

    handleShow = ()=>{
        this.setState({
            show : true
        })
    }

    handleClose = ()=>{
        this.setState({
            show : false
        })
    }

    handleChangeUsername = e =>{
        this.setState({
            username : e.target.value
        })
    }

    handleChangePassword = e =>{
        this.setState({
            password : e.target.value
        })
    }

    handleSubmit = async e => {
        try {
            const token = await axios.post("https://dps-dot-e-checkin-server-283807.et.r.appspot.com/api/users/login", 
            {username : this.state.username, password : this.state.password});
            localStorage.setItem("token", JSON.stringify(token.data))
            this.toAdmin();
        } catch (error) {
            console.log(error);
        }
        
    }

    toAdmin = () => {
        this.props.history.push({
            pathname: `/admin`,
        });
    }



    render(){
        return(
            <>
                <Button variant="light" onClick={() =>this.handleShow()} className={styles.signin}>Sign as admin</Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={this.state.username} onChange={this.handleChangeUsername} type="text" placeholder="Username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} onChange={this.handleChangePassword} type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={()=>this.handleSubmit()} variant="primary">
                        Log in
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
        )
    }
}

export default withRouter(Logincomponent);