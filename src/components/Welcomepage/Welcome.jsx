import React from 'react';
import styles from './Welcome.module.css';
import {Card} from 'react-bootstrap';
import {lagu1} from "../../lagu/datapengunjungmasuk.mp3";

class Welcomepage extends React.Component{

    componentDidMount(){
        const audio2 = document.getElementsByClassName("audio-elem")[0];
        audio2.play(); 
    }

    render(){
        return(
            <div className={styles.container}>
                <div className={styles.bodyy}>
                    <div>
                        <Card>
                            <Card.Body>
                                <div>
                                    <div>
                                        <h4>Silahkan masuk ke <br/> LLDIKTI VIII (Lembaga Layanan Pendidikan Tinggi VIII)</h4>
                                        <p style={{fontSize : "18px", marginTop : "20px"}}>Data berhasil dikirim, sekarang anda dapat memasuki area</p>
                                    </div>
                                </div>
                                <audio className="audio-elem">
                                        <source src={lagu1}></source>
                                </audio>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Welcomepage