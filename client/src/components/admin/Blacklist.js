import React from 'react';
import { useState, useEffect } from 'react';


import { Card, Button, Modal } from 'react-bootstrap';


import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";


/*----------------------------------------------------------------------*/

function Noti() {

    const [display, setDisplay] = useState(false)

    const Handledisplay = () => {
        setDisplay(!display);
    }
    const [show, setShow] = useState(false);


    const handleClose = () => {
        localStorage.setItem('Firstpopup', false);
        setShow(false);
    };


    useEffect(async () => {
        // const Firstpopup = localStorage.getItem('Firstpopup');
        await setShow(localStorage.getItem('Firstpopup'));
        await localStorage.setItem('Firstpopup', false);
    }, []);


// ====================================== Blacklist =========================================
return (
    <div>
      <div className="bigpopup">
        <Modal className="popup" show={show}>
          <div className="p">
            <Modal.Header
              className="popuptitle"
              closeButton
              onClick={handleClose}
            >
              {/* <div className="y"></div> */}
            </Modal.Header>
            <Modal.Body>Blacklist</Modal.Body>
        


            <br/>
            <table width="100%">

              <tr>
                <td>Username1</td>
                <td><button > Profile </button></td>
                <td><button > Release </button></td>
              </tr>
              <br/>
              <tr>
                <td>Username2</td>
                <td><button > Profile </button></td>
                <td><button > Release </button></td>
              </tr>
            </table>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default Noti;