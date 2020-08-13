import React from 'react';
import styles from './Admin.module.css';
import { Table} from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
class ScanQR extends React.Component{
    state = {
      data : [],
      statistik : {}
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

    async componentDidMount(){
      
      const respon = await axios({
        method : "get",
        url : "https://e-checkin-server-283807.et.r.appspot.com/api/visitors",
        headers : {
          Authorization : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
        }
      })

      const stat = await axios({
        method : "get",
        url : "https://e-checkin-server-283807.et.r.appspot.com/api/visitors/stats",
        headers : {
          Authorization : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
        }
      })

      this.setState({
        data : respon.data,
        statistik : stat.data
      })

      console.log(this.state.statistik)
    }
    render(){
        return(
            <div className={styles.container}>
                
                <div className={styles.bodyy}>
                    <div className = {styles.data}>
                        
                        <h2 style={{color : "white"}}>Statistik</h2>
                        <div class="row row-cols-1 row-cols-md-3 g-4">
                            <div class="col mb-2">
                                <div class="card h-100"  >
                                <div class="card-body">
                                    <p class="card-title">Orang datang</p>
                                <h2 class="card-text">{this.state.statistik.checkedInCount}</h2>
                                </div>
                                </div>
                            </div>
                            <div class="col mb-2">
                                <div class="card h-100" >
                                <div class="card-body">
                                    <p class="card-title">Orang di lokasi</p>
                                    <h2 class="card-text">{(this.state.statistik.checkedInCount)-(this.state.statistik.checkedOutCount)}</h2>
                                </div>
                                </div>
                            </div>
                            <div class="col mb-2">
                                <div class="card h-100" >
                                <div class="card-body">
                                    <p class="card-title">Orang keluar</p>
                                <h2 class="card-text">{this.state.statistik.checkedOutCount}</h2>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div>

                        <h2 style={{marginTop : "40px"}}>Data Pengunjung</h2>
                        <div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Nama</th>
                              <th>No Tlp</th>
                              <th>Alamat</th>
                            </tr>
                          </thead>
                          <tbody>
                           {this.state.data.map((pengunjung,no)=>(
                             <tr>
                               <td>{no+1}</td>
                               <td>{pengunjung.name}</td>
                               <td>{pengunjung.telp}</td>
                               <td>{pengunjung.address}</td>
                             </tr>
                           ))}
                          </tbody>
                        </Table>
                        </div>
                        </div>
                    
                        </div>
                </div>

                
            </div>
        )
    }
}

export default ScanQR;