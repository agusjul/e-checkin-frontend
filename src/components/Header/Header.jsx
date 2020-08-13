import React from 'react';
import {Navbar} from 'react-bootstrap';
import styles from './Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Login/Login';

import { withRouter } from 'react-router-dom';

class Headercomponent extends React.Component {

    toAdmin = () => {
        this.props.history.push({
            pathname: `/admin`,
        });
    }


    render(){
        return(
            <Navbar className={styles.header}>
                <Navbar.Brand href="#home" style={{color : "white"}}>Check In App</Navbar.Brand>
                <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Login/>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Headercomponent);