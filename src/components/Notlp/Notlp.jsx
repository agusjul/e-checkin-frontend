import React from 'react';
import styles from './Notlp.module.css';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import { db } from '../../config/firebase';
import { withRouter } from 'react-router-dom';
class Notelepon extends React.Component {
    
    state = {
        no : "",
        data : [],
        show : false,
        temperature : 0
    }
    
    componentDidMount(){
        db.ref('pengunjung/temperature').once('value', snapshot => {
            const x = snapshot.val()
            console.log(x)
            this.setState({
                temperature : parseFloat(x),
               
            })
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        // if(this.state.no.length === 8){
            const socket = io("https://badung-dot-e-checkin-server-283807.et.r.appspot.com", {transports: ['polling']});
            console.log(socket);
            const visitor = await axios.post("https://badung-dot-e-checkin-server-283807.et.r.appspot.com/api/visitors/verify-telp",
            {   telp : this.state.no,
                bodyTemp : this.state.temperature
            })

            console.log(visitor);
            if(visitor.data.exist){
                socket.emit("add-new-visitor")
                localStorage.setItem("id", visitor.data._id);
                db.ref('pengunjung').update({onSubmit : true});
                // db.ref('pengunjung').update({newData : false});
                this.toWelcome();
            }
            else{
                this.setState({
                    show:true
                })
                this.props.number(this.state.no)
            }

            
        // }

        console.log(this.state.no.length);
        
    }

    toWelcome = () => {
        this.props.history.push({
            pathname: `/welcome`,
        });
    }

    toForm = () => {
        this.props.history.push({
            pathname: `/user`,
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
                   
                <Alert variant="danger" show={this.state.show} style={{position : "absolute", top : "0", width :"100%"}}>
                   <p> Data tidak ditemukan, pastikan anda terdaftar sebagai pengunjung terlebih dahulu</p>
                    <div style={{textAlign : "right"}}>
                        <Button  onClick ={() => this.toForm()} >Daftar</Button>
                    </div>
                    
                </Alert>
                <h5 style={{color: "white", textAlign : "center", paddingTop : "40px", paddingBottom : "20px"}}>Check in</h5>
                <div className={styles.bodyy}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>No Hp</Form.Label>
                            <Form.Control  value={this.state.no} onChange={this.handleNoChange} type="number"  />
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
                                Sumbit data
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Notelepon)