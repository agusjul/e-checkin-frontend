import React from 'react';
import styles from './ScanQR.module.css';
import {Card} from 'react-bootstrap';
import img1 from '../../image/qrcode.png';
import { db } from '../../config/firebase'; 
import { withRouter } from 'react-router-dom';
import CountUp from 'react-countup';
class ScanQR extends React.Component{

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

        db.ref('pengunjung/onSubmit').on('value', snapshot =>{
                    if(snapshot.val()){
                        db.ref('pengunjung').update({onSubmit : false});
                        this.props.history.push({
                            pathname: `/`,
                        });
                    }
        }) 

        db.ref('pengunjung').update({newData : false});
        db.ref('pengunjung').on('value', snapshot => {
            const data = snapshot.val()

            this.setState({ pengunjung: data })
            
                setTimeout(
                    () => {
                        if((data.temperature >= 37) || (!data.mask)){
                           
                        this.props.history.push({
                            pathname: `/`,
                        });}
                    }, 5000
                )

            

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
        console.log(this.state);

        let qr = <div style={{textAlign : "center"}}><p> <span className ="text-danger font-weight-bold">Anda tidak dapat masuk!!!,</span> <br/> <br/> kembali ke halaman awal pada hitungan</p><h1 style={{textAlign : "center"}}><CountUp start={5} end={0} duration={5} separator=" " useEasing={false}></CountUp></h1></div>
        if ((this.state.pengunjung.temperature < 37) && this.state.pengunjung.mask){
            qr = <img src={img1} style={{width : "100%"}} alt=""/>
        }
        return(
            <div className={styles.container}>
                <div className={styles.bodyy}>
                    <Card className={styles.qr}>
                        <Card.Body>
                            <div className={styles.scanarea}>
                                <div className={styles.information}>
                                <div className = {styles.data}>
                                        
                                        <h2 style={{color : "161616", justifyContent : "left", display : "flex", marginBottom :"40px"}}>Your Condition :</h2>
                                        <div class="row row-cols-1 row-cols-md-3 g-4">
                                            <div class="col mb-2">
                                                <div class="card h-100"  >
                                                <div class="card-body">
                                                    <p class="card-title">Suhu Tubuh</p>
                                                    <h2 class={`card-text text-${this.state.pengunjung.temperature < 37 ? 'success' : 'danger'}`}>
                                                        {this.state.pengunjung.temperature}&deg;
                                                    </h2>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col mb-2">
                                                <div class="card h-100" >
                                                <div class="card-body">
                                                    <p class="card-title">Deteksi Masker</p>
                                                    <h2 class={`card-text text-${this.state.pengunjung.mask ? 'success' : 'danger'}`}>
                                                        {this.state.pengunjung.mask ? 'Yes' : 'No'}
                                                    </h2>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                </div>
                                <div className={styles.qrcode}>
                                    <div className={styles.shade1}>
                                        <div className={styles.shade2}>
                                            {qr}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
            </div>
        )
    }
}

export default withRouter(ScanQR);