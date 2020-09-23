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
        email : " ",
        jk : "Laki-laki",
        tgllahir : " ",
        noidentitas : " ",
        negara : " ",
        riwayat : " ",
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
        this.setState({
            no : this.props.tlp
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state)
        // if(this.state.no.length === 8){
            const socket = io("https://e-checkin-server-283807.et.r.appspot.com", {transports: ['polling']});
            console.log(socket);
            const visitor = await axios.post("https://e-checkin-server-283807.et.r.appspot.com/api/visitors",
                {
                    name : this.state.nama,
                    telp : this.state.no, 
                    bodyTemp : this.state.temperature,
                    // gender : this.state.jk,
                    // birthDate : this.state.tgllahir,
                    email : this.state.email,
                    // idNumber : this.state.noidentitas,
                    // address : this.state.alamat,
                    // nationality : this.state.negara,
                    // travelHistory : this.state.riwayat
                })
            this.setState({
                show:true
            })
            socket.emit("add-new-visitor")
            localStorage.setItem("id", visitor.data._id);
            db.ref('pengunjung').update({onSubmit : true});
            // db.ref('pengunjung').update({newData : false});
            
            
            this.toWelcome();
        // }

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
    handleJenisKelaminChange = e => {
        this.setState ({
            jk : e.target.value
        })
        console.log(this.state.jk);
    }
    handleTanggalLahirChange = e => {
        this.setState ({
            tgllahir : e.target.value
        })
    }
    handleNoIdentitasChange = e => {
        this.setState ({
            noidentitas : e.target.value
        })
    }
    handleEmailChange = e => {
        this.setState ({
            email : e.target.value
        })
    }
    handleKewarganegaraanChange = e => {
        this.setState ({
            negara : e.target.value
        })
    }
    handleRiwayatChange = e => {
        this.setState ({
            riwayat : e.target.value
        })
    }
    handleAlamatChange = e => {
        this.setState ({
            alamat : e.target.value
        })
    }

    render(){
        return(
            
            <div className={styles.container}>
                   
                <Alert variant="success" show={this.state.show} style={{position : "absolute", top : "0", width :"100%"}}>
                    Data berhasil disimpan
                </Alert>
                <h5 style={{color: "white", textAlign : "center", paddingTop : "40px", paddingBottom : "20px"}}>Form Data Pengunjung</h5>
                <div className={styles.bodyy}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control value={this.state.nama} onChange={this.handleNamaChange} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>No Hp</Form.Label>
                            <Form.Control  value={this.state.no} onChange={this.handleNoChange} type="number"  />
                        </Form.Group>
                        {/* <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Jenis Kelamin</Form.Label>
                                <Form.Control as="select" value={this.state.jk} onChange={this.handleJenisKelaminChange}>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                                <option value="Lainnya">Lainnya</option>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control type="date" value={this.state.tgllahir} onChange={this.handleTanggalLahirChange} />
                        </Form.Group> */}
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={this.state.email} onChange={this.handleEmailChange} />
                        </Form.Group>
                        {/* <Form.Group controlId="formGroupPassword">
                            <Form.Label>No Identitas (passport)</Form.Label>
                            <Form.Control type="number"  value={this.state.noidentitas} onChange={this.handleNoIdentitasChange}/>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Kewarganegaraan</Form.Label>
                            <Form.Control  type="text" value={this.state.negara} onChange={this.handleKewarganegaraanChange} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Riwayat Perjalanan (2 hari terakhir)</Form.Label>
                            <Form.Control as="textarea" value={this.state.riwayat} onChange={this.handleRiwayatChange} rows="3" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control as="textarea" rows="3" value={this.state.alamat} onChange={this.handleAlamatChange}/>
                        </Form.Group> */}

                        <hr/>
                        <p className={styles.disclaim}>Dengan mendaftar masuk, saya menyatakan bahwa / By checking in, I declare that :</p>
                        <ul>
                            <li className={styles.text}>Saya tidak pernah berkontak langsung dengan pasien pengidap COVID-19 dalam 14 hari kebelakang / I have not had close contact with confirmed COVID-19 case in the past 14 days</li>
                            <li className={styles.text}>Saya tidak dalam anjuran Karantina Mandiri / I am not serving a Self Quarantine Notice</li>
                            <li className={styles.text}>Saya tidak memiliki gejala sakit flu dan/atau demam / I do not have any flu-like symptoms and/or fever</li>
                            <li className={styles.text}>Saya menyetujui persyaratan dan menyetujui pengumpulan dan penggunaan informasi saya untuk tujuan pelacakan kontak COVID-19 / I agree to term and consent to the collection and use of my information for the purpose of COVID-19 contact tracing.</li>
                        </ul>
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