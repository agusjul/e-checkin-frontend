import React from 'react';
import styles from './ScanQR.module.css';
import {Card} from 'react-bootstrap';
import img1 from '../../image/qrcode.png';
import { db } from '../../config/firebase'; 
import { withRouter } from 'react-router-dom';
import CountUp from 'react-countup';
import {Helmet} from "react-helmet";
import {laguNormal} from './selamatDatang.mp3';
import {laguDiatasNormal} from '../../lagu/new/suhuTuhuhDiatasNormal.mp3'


const suara = require('../../lagu/new/selamatDatang.mp3');
const suara2 = require('../../lagu/new/suhuTuhuhDiatasNormal.mp3');
const suara3 = require('../../lagu/new/submitSuccess.mp3');
class ScanQR extends React.Component{

    constructor (props){
        super(props);
        this.suhuNormal = React.createRef();
        this.tidakNormal = React.createRef();
        this.selamat = React.createRef();
    }

    state ={
        pengunjung : {}
    }

    // socket = io("https://e-checkin-server-283807.et.r.appspot.com", {transports: ['polling']})

    // componentDidUpdate(){
    //     db.ref('pengunjung/onSubmit').on('value', snapshot =>{
    //         if(snapshot.val()){
    //             this.props.history.push({
    //                 pathname: `/`,
    //             });
    //         }
    //     }) 
    //   }

    componentDidMount(){
        // const audiol = document.getElementsByClassName("audio")[0]
        // audiol.play()  
        
        
        db.ref('pengunjung/onSubmit').on('value', snapshot =>{
            if(snapshot.val()){
                db.ref('pengunjung').update({onSubmit : false});

                // const thanks = document.getElementsByClassName("audio-thanks")[0]
                //     thanks.play() 
                this.selamat.play()

                    setTimeout(
                        function() {
                            this.props.history.push({pathname: `/`});
                        }
                        .bind(this),
                        12000
                    );
            }
        }) 

        db.ref('pengunjung').update({newData : false});
        db.ref('pengunjung').once('value', snapshot => {
            const data = snapshot.val()

            this.setState({ pengunjung: data })          
                if(data.temperature >= 37.3){

                    // const diatasNormal = document.getElementsByClassName("audio-element-diatasNormal")[0]
                    // diatasNormal.play() 
                    this.tidakNormal.play();

                    setTimeout(
                        function() {
                            this.props.history.push({pathname: `/`});
                        }
                        .bind(this),
                        10000
                    );

                    // setTimeout(() => {
                    //     this.props.history.push({
                    //         pathname: `/`,
                    //   }, 10000);
                    // setTimeout(function(){
                    //     this.props.history.push({
                    //     pathname: `/`,
                    //     }
                    // , 10000)});
                    
             
                }else{
                        // const normal = document.getElementsByClassName("audio-element-normal")[0]
                        // normal.play() 
                        this.suhuNormal.play();
                        setTimeout(
                            function(){
                                window.init();
                                }, 
                            1500
                        );
                        
                    }
                
            

            

        })

        

        // const stat = await axios({
        //     method : "get",
        //     url : "https://e-checkin-server-283807.et.r.appspot.com/api/visitors/stats",
        //     headers : {
        //       Authorization : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
        //     }
        //   })

        //   this.setState({
        //     statistik : stat.data
        //   })

        //   console.log(this.state.statistik)
    }

    
    render(){
        

        const script = document.createElement("script");
       
        

        console.log(this.state);

        
        let webcam2 = <h2 id="label-container"></h2>
        let peringatan = <h5 style={{textAlign : "right", paddingRight : "50px", paddingTop : "10px"}} className="text-danger" id="warning"></h5>

        let qr = <div style={{textAlign : "center"}}><p> <span className ="text-danger font-weight-bold">Mohon Maaf, Anda Tidak Bisa Masuk.</span> <br/> <br/> (Kembali ke Halaman Utama)</p><h1 style={{textAlign : "center"}}><CountUp start={10} end={0} duration={10} separator=" " useEasing={false}></CountUp></h1></div>
        if ((this.state.pengunjung.temperature < 37.3) && this.state.pengunjung.mask){
            qr = <img src={img1} style={{width : "200px", position : "absolute", display : "none"}} id="qr-code" alt=""/>
        }
        return(
            <div className={styles.container}>
                <div className={styles.bodyy}>
                    <Card className={styles.qr}>
                        <Card.Body>
                                <audio className="audio-element-normal" ref={(input) => {this.suhuNormal = input}}>
                                     <source src={process.env.PUBLIC_URL + '/sound/new/selamatDatang.mp3'} type="audio/mpeg"></source>
                                </audio>

                                <audio className="audio-element-diatasNormal" ref={(input) => {this.tidakNormal = input}}>
                                     <source src={process.env.PUBLIC_URL + '/sound/new/suhuTuhuhDiatasNormal.mp3'} type="audio/mpeg"></source>
                                </audio>

                                <audio className="audio-thanks" ref={(input) => {this.selamat = input}}>
                                     <source src={process.env.PUBLIC_URL + '/sound/new/submitSuccess.mp3'} type="audio/mpeg"></source>
                                </audio>
                            <div className={styles.scanarea}>
                                <div className={styles.information}>
                                <div className = {styles.data}>
                                        
                                        <h2 style={{color : "161616", justifyContent : "left", display : "flex", marginBottom :"40px"}}>Kondisi Anda :</h2>
                                        <div class="row row-cols-1 row-cols-md-3 g-4">
                                            <div class="col mb-2">
                                                <div class="card h-100"  >
                                                <div class="card-body">
                                                    <p class="card-title">Suhu Tubuh</p>
                                                    <h2 id = "suhutub" class={`card-text text-${this.state.pengunjung.temperature < 37.3 ? 'success' : 'danger'}`}>
                                                        {this.state.pengunjung.temperature}&deg;
                                                    </h2>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col mb-2">
                                                <div class="card h-100" >
                                                <div class="card-body">
                                                    <p class="card-title">Deteksi Masker</p>
                                                    {/* <h2 class={`card-text text-${this.state.pengunjung.mask ? 'success' : 'danger'}`}>
                                                        {this.state.pengunjung.mask ? 'Yes' : 'No'}
                                                    </h2> */}
                                                    {webcam2}
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                </div>
                                <div className={styles.qrcode}>
                                    <div className={styles.shade1}>
                                        <div className={styles.shade2}>
                                            {/* <Helmet>                                        
                                                <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
                                                <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
                                            </Helmet> */}
                                            
                                            
                                            <div id="webcam-container">{qr}</div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            {peringatan}
                        </Card.Body>
                    </Card>
                    
                    </div>
            </div>
        )
    }
}

export default withRouter(ScanQR);