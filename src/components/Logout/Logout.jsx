import React from 'react';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

class Logoutcomponent extends React.Component {

    handleLogout = async() =>{
        const socket = io("https://dps-dot-e-checkin-server-283807.et.r.appspot.com", {transports: ['polling']})
        const id = localStorage.getItem("id")
        await axios.get(`https://dps-dot-e-checkin-server-283807.et.r.appspot.com/api/visitors/${id}/out`)
        socket.emit("add-new-visitor")
        localStorage.clear();
        this.toUser();
    }

    toUser = () => {
        this.props.history.push({
            pathname: `/user`,
        });
    }
    render(){
        return(
            <div>
                <Card className="mt-4 text-center">
                    <Card.Header>Logout</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        Terimakasih telah mengunjungi STMIK Primakara
                        </Card.Text>
                        <Button onClick={() => this.handleLogout()} variant="primary">Keluar</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withRouter(Logoutcomponent)