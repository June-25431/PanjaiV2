import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import { TextField, withStyles, Button } from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import loginImg from "../img/login.svg";
import "./login.css";
import { render } from 'react-dom';

const styles = theme => ({
    container: {
        backgroundColor: 'red'
    }
})

function LoginFrom() {
/*------------------------------------------------------------*/
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const PanjaiToken = localStorage.getItem('PanjaiToken');

    const uploadFile = (event) => {
        event.preventDefault()
        // console.log(username)
        // console.log(password)
        const data = {username, password, PanjaiToken}
        //console.log(data)
        Axios.post('/authenticate/login', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async function(res){
            console.log(res);
            if(res.data[0]) {
                localStorage.setItem('Firstpopup', true);
                localStorage.setItem('PanjaiToken', res.data[0]);
                localStorage.setItem('currentUser', res.data[1]);
                localStorage.setItem('currentUser_id', res.data[2]);
                localStorage.setItem('currentUser_email', res.data[3]);
                localStorage.setItem('currentUser_address', res.data[4]);
                localStorage.setItem('currentUser_phone', res.data[5]);
                localStorage.setItem('currentUser_name', res.data[6])
                await localStorage.setItem('popupYet', false)
                window.location.href = "http://localhost:3000"
            } else {
                window.alert("Username or password incorrect.")
            }
            //window.alert("ERROR: "+res.data.message)
            //console.log(PanjaiToken)
        }).catch(error => console.log(error))
    }

/*-----------------------------------------------------------*/
    return (
        <div className="grid-container" >
            <div className="item1">
                <div className="image">
                    <img src={loginImg} />
                </div>
            </div>
            <div className="item2">
                <h3>เข้าสู่ระบบ</h3><br/>
                <form>
                    <div className="form-group">
                        <label>ชื่อผู้ใช้:</label><br />
                        <input
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        onChange={(event) =>{
                            setUsername(event.target.value)
                        }}
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label>รหัสผ่าน:</label><br />
                        <input
                        type="password"
                        placeholder="รหัสผ่าน"
                        onChange={(event) =>{
                            setPassword(event.target.value)
                        }}
                        >
                        </input>
                    </div>
                    <div className="button-login">
                        <button type='submit' className="btn btn-lg" onClick={uploadFile}>เข้าสู่ระบบ</button>
                    </div>
                </form>
                <div>
                <br />
                    <h5>
                        <a href="/Register">ลืมรหัสผ่าน</a> | <a href="/Register">สมัครสมาชิก</a>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default LoginFrom;
//export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPanjaiForm));