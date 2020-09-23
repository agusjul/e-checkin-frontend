import React from 'react';
import styles from './Homepage.module.css';
import {Card, Carousel} from 'react-bootstrap';
import io from 'socket.io-client';
import axios from 'axios';
import { db } from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import lagu from "../../lagu/new/submitSuccess.mp3";
import img1 from '../../image/a.jpg';
import img2 from '../../image/b.jpg';
import img3 from '../../image/c.jpg';
import { BsExclamationTriangle } from "react-icons/bs";
class Homepage extends React.Component{

    state ={
        statistik : {},
        pengunjung: {},
        newCheckin : true
    }

    socket = io("https://e-checkin-server-283807.et.r.appspot.com", {transports: ['polling']})

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
            url : "https://e-checkin-server-283807.et.r.appspot.com/api/visitors/stats",
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

        db.ref('pengunjung/newCheckin').on('value',snapshot =>{
            const data = snapshot.val()
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
                    <h1>Silahkan Berdiri di Tempat yang telah disediakan</h1>
                </div>
                </Card.Body>
                
                
            </Card>
        )

        const tidakpengunjung = (
            <Card className={styles.qr}>
                        <Card.Body>
                            <div className={styles.scanarea}>
                                <div className={styles.information}>
                                    <h1>Selamat Datang di  LLDIKTI VIII <br/> (Lembaga Layanan Pendidikan Tinggi VIII)</h1>
                                    <p style={{fontSize : "24px", marginTop : "20px"}}>Silahkan berdiri di tempat yang telah ditentukan, kemudian lakukan scan suhu tubuh dengan mendekatkan dahi ke Sensor</p>
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
                <div className={styles.bodyy}>
                    {
                        this.state.newCheckin ? pengunjungbaru : tidakpengunjung
                    }
                    
                </div>
            </div>
        )
    }
}

export default withRouter(Homepage);