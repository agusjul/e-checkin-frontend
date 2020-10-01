import React from 'react';
import styles from './Homepage.module.css';
import {Card, Carousel} from 'react-bootstrap';
import io from 'socket.io-client';
import axios from 'axios';
import { db } from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import lagu from "../../lagu/new/submitSuccess.mp3";
import img1 from '../../image/logo-01.png';
import { BsExclamationTriangle } from "react-icons/bs";

const suarasd = require('../../lagu/new/selamatdatangpudak.mp3');


class Homepage extends React.Component{

    constructor(props) {
    super(props)
    this.myRef = React.createRef();
  }  

    state ={
        statistik : {},
        pengunjung: {},
        newCheckin : false
    }

    socket = io("https://dps-dot-e-checkin-server-283807.et.r.appspot.com", {transports: ['polling']})

    componentDidUpdate(){
        const app = this
        this.socket.on(`visitors-updated`, function(v){
          console.log(v)
          app.setState({
            data : v.visitors,
            statistik : v.stats
          })
        })

        
      }

    didalam(){
        const a = this.state.statistik.checkedInCount
        const b = this.state.statistik.checkedOutCount
        const dalam = a + b;
        if (dalam < 0){
            return 0
        } else {
            return a+b
        }
    }

    async componentDidMount(){
        // const audioEl = document.getElementsByClassName("audio-element")[0]
        // audioEl.play()  
        const stat = await axios({
            method : "get",
            url : "https://dps-dot-e-checkin-server-283807.et.r.appspot.com/api/visitors/stats",
            // headers : {
            //   Authorization : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
            // }
          })

          this.setState({
            statistik : stat.data
          })
          
        //   Fetch data from Firebase
        db.ref('pengunjung/newData').on('value', snapshot => {
            const data = snapshot.val()


            if(data) {
                // redirect...
                this.props.history.push({
                    pathname: `/scanqr`,
                });
            }
        })

        db.ref('pengunjung/newCheckin').on('value', snapshot =>{

            
            const data = snapshot.val()
            if(data){
                this.myRef.play(); 
            }
            this.setState({
                newCheckin : data
            })
        })

    }

    

    render(){
        const pengunjungbaru = (
            <Card className={styles.qr}>
                <Card.Body className={styles.information}>
                <div style={{padding : "50px"}}>
                    <BsExclamationTriangle style={{fontSize : "108px", marginBottom : "20px"}}/>
                    <h1>Silahkan berdiri di tempat yang sudah ditandai</h1>
                </div>
                </Card.Body>
                
                
            </Card>
        )

        const tidakpengunjung = (
            <Card className={styles.qr}>
                <Card.Header className="text-center p-0"> 
                    <img src={img1} alt="logoprimakara&pemkot" style={{height : "100px"}}/> 
                </Card.Header>
                        <Card.Body>
                            <div className={styles.scanarea}>
                                <div className={styles.information}>
                                    <h2>Selamat Datang di Denpasar Festival <br/>Tahun 2020</h2>
                                        <p style={{fontSize : "18px", marginTop : "20px"}}>
                                            Automatic Inspection Gate Merupakan alat pendeteksi Suhu dan Masker Otomatis 
                                            yang mampu mencatat jumlah pengujung yang telah masuk, sedang didalam, 
                                            hingga yang telah keluar dari Denpasar Festival
                                        </p>
                                        <audio className="audio-element">
                                            <source src={lagu}></source>
                                        </audio>    
                                </div>
                            </div>
                            <div>
                            
                                <div className = {styles.data}>
                                        
                                        <h2 style={{color : "161616", justifyContent : "center", display : "flex", marginTop :"20px"}}></h2>
                                        <div class="row row-cols-1 row-cols-md-3 g-4">
                                            <div class="col mb-2">
                                                <div class="card h-100"  >
                                                <div class="card-body">
                                                    <p class="card-title">Orang Masuk</p>
                                                <h2 class="card-text">{this.didalam()}</h2>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col mb-2">
                                                <div class="card h-100" >
                                                <div class="card-body">
                                                    <p class="card-title">Orang di Dalam</p>
                                                    <h2 class="card-text">{
                                                        this.state.statistik.checkedInCount
                                                        
                                                        }
                                                    </h2>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col mb-2">
                                                <div class="card h-100" >
                                                <div class="card-body">
                                                    <p class="card-title">Orang Keluar</p>
                                                <h2 class="card-text">{this.state.statistik.checkedOutCount}</h2>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-right">
                          <small className="text-muted">developed by : STMIK Primakara</small>
                        </Card.Footer>
                    </Card>
        )

        return(
            // <Carousel>
            //     <Carousel.Item>
            //     <img
            //         className="d-block w-100"
            //         src={img1}
            //         alt="First slide"
            //     />
            //     <Carousel.Caption>
            //         <h3>First slide label</h3>
            //         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            //     </Carousel.Caption>
            //     </Carousel.Item>
            //     <Carousel.Item>
            //     <img
            //         className="d-block w-100"
            //         src={img2}
            //         alt="Third slide"
            //     />

            //     <Carousel.Caption>
            //         <h3>Second slide label</h3>
            //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            //     </Carousel.Caption>
            //     </Carousel.Item>
            //     <Carousel.Item>
            //     <img
            //         className="d-block w-100"
            //         src={img3}
            //         alt="Third slide"
            //     />

            //     <Carousel.Caption>
            //         <h3>Third slide label</h3>
            //         <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            //     </Carousel.Caption>
            //     </Carousel.Item>
            //     </Carousel>



            <div className={styles.container}>
                    <audio className="audio-element-selamatDatang" ref={(input) => {this.myRef = input}}>
                        <source src={suarasd} type="audio/mpeg"></source>
                    </audio>
                    <div className={styles.bodyy}>
                    {
                        !this.state.newCheckin ? tidakpengunjung : pengunjungbaru
                    }
                    
                </div>
            </div>

            
        )
    }
}

export default withRouter(Homepage);