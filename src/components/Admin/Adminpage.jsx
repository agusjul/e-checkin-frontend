import React from 'react';
import styles from './Admin.module.css';
import { Table, Button} from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment';
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

    async deleteAll(){
      await axios.delete("https://e-checkin-server-283807.et.r.appspot.com/api/visitors/delete", {
        headers : {
          Authorization : `bearer ${JSON.parse(localStorage.getItem("token")).token}`
        }
      })
      this.socket.emit("add-new-visitor")
    }

    async delete(id){
      await axios.delete(`https://e-checkin-server-283807.et.r.appspot.com/api/visitors/${id}/delete`, {
        headers : {
          Authorization : `bearer ${JSON.parse(localStorage.getItem("token")).token}`
        }
      })
      this.socket.emit("add-new-visitor")
    }

    
    

    parseDate(date){
      const d = new Date(date);
      return d.toLocaleDateString();
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
                                <h2 class="card-text">{this.didalam()}</h2>
                                </div>
                                </div>
                            </div>
                            <div class="col mb-2">
                                <div class="card h-100" >
                                <div class="card-body">
                                    <p class="card-title">Orang di lokasi</p>
                                    <h2 class="card-text">{this.state.statistik.checkedInCount}</h2>
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
                        <div style={{display : "flex", justifyContent : "space-between", marginTop : "40px", widht : "100%"}}>
                          <h2 >Data Pengunjung</h2>
                          <Button variant="danger" onClick={()=> this.deleteAll()} className="h-25">Hapus semua data</Button>
                        </div>
                        
                        <div>
                        <Table striped bordered hover responsive className="w-100">
                         
                          <thead>
                            <tr>
                              <th>No</th>
                              <th className="w-25">Nama</th>
                              {/* <th>Jenis Kelamin</th> */}
                              <th className="w-25">No Tlp</th>
                              <th className="w-25">Email</th>
                              {/* <th>No Identitas</th>
                              <th>Kewarganegaraan</th> */}
                              <th>Suhu Tubuh</th>
                              <th>Tanggal Masuk</th>
                              {/* <th>Tanggal Lahir</th>
                              <th>Umur</th>
                              <th>Riwayat Perjalaan (2 hari terakhir)</th> */}
                              {/* <th>Alamat</th> */}
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                           {this.state.data.map((pengunjung,no)=>(
                             <tr>
                                <td>{no+1}</td>
                                <td>{pengunjung.name}</td>
                                {/* <td>{pengunjung.gender}</td> */}
                                <td>{pengunjung.telp}</td>
                                <td>{pengunjung.email}</td>
                                {/* <td>{pengunjung.idNumber}</td>
                                <td>{pengunjung.nationality}</td> */}
                                <td>{pengunjung.bodyTemp}</td>
                                <td>{moment().format('l')}</td>
                                {/* <td>{this.parseDate(pengunjung.birthDate)}</td>
                                <td>{pengunjung.age}</td>
                                <td>{pengunjung.travelHistory}</td> */}
                                {/* <td>{pengunjung.address}</td> */}
                                <td><Button variant="danger" onClick={()=>this.delete(pengunjung._id)}>Hapus</Button></td>
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