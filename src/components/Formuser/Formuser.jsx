import React from 'react';
import styles from './Formuser.module.css';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import { db } from '../../config/firebase';
import { withRouter } from 'react-router-dom';
class Formcomponent extends React.Component {
    state = {
        nama : "",
        no : "",
        alamat : "",
        data : [],
        show : false
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(this.state.no.length === 8){
            const socket = io("https://e-checkin-server-283807.et.r.appspot.com", {transports: ['polling']});
            console.log(socket);
            const visitor = await axios.post("https://e-checkin-server-283807.et.r.appspot.com/api/visitors",
            {name : this.state.nama, telp : this.state.no})
            this.setState({
                show:true
            })
            socket.emit("add-new-visitor")
            localStorage.setItem("id", visitor.data._id);
            db.ref('pengunjung').update({onSubmit : true});
            // db.ref('pengunjung').update({newData : false});
            this.toWelcome();
        }

        console.log(this.state.no.length);
        
    }

    toWelcome = () => {
        this.props.history.push({
            pathname: `/welcome`,
        });
    }

    handleNamaChange = e => {
        this.setState ({
            nama : e.target.value
        })
    }
    handleNoChange = e => {
        this.setState ({
            no : e.target.value
        })
    }
    // handleAlamatChange = e => {
    //     this.setState ({
    //         alamat : e.target.value
    //     })
    // }

    render(){
        return(
            
            <div className={styles.container}>
                   
                <Alert variant="success" show={this.state.show} style={{position : "absolute", top : "0", width :"100%"}}>
                    Nama : {this.state.nama}
                </Alert>
                <h5 style={{color: "white", textAlign : "center", paddingTop : "40px", paddingBottom : "20px"}}>Form Data Pengunjung</h5>
                <div className={styles.bodyy}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control value={this.state.nama} onChange={this.handleNamaChange} type="text" placeholder="Destrawan" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>No Hp</Form.Label>
                            <Form.Control  value={this.state.no} onChange={this.handleNoChange} type="number" placeholder="087860876789" />
                        </Form.Group>
                        {/* <Form.Group controlId="formGroupPassword">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control as="textarea" value={this.state.alamat} onChange={this.handleAlamatChange} rows="3" type="text" placeholder="Jln. Kesiman no.8, Denpasar" />
                        </Form.Group> */}
                        <div className={styles.gruptombol}>
                            <Button variant="outline-primary" className={styles.tombol}>
                                Batal
                            </Button>
                            <Button variant="primary"  className={styles.tombol} type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Formcomponent)