import React from 'react';
import {Navbar} from 'react-bootstrap';
import styles from './Mobile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { withRouter } from 'react-router-dom';

class Headercomponent extends React.Component {

    toAdmin = () => {
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
                        {/* <Button variant="light" onClick={() =>this.toAdmin()} className={styles.signin}></Button> */}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Headercomponent);