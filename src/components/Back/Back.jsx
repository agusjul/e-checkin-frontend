import React from 'react';
import {Navbar, Button} from 'react-bootstrap';
import styles from './Back.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { withRouter } from 'react-router-dom';

class Headercomponent extends React.Component {

    toAdmin = () => {
        localStorage.clear();
        this.props.history.push({
            pathname: `/`,
        });
    }


    render(){
        return(
            <Navbar className={styles.header}>
                <Navbar.Brand href="#home" style={{color : "white"}}>Check In App</Navbar.Brand>
                <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button variant="light" onClick={() =>this.toAdmin()} className={styles.signin}>Log out</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Headercomponent);