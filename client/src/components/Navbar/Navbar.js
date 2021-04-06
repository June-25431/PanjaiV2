import { FormatColorResetOutlined, Search } from '@material-ui/icons';
import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import Axios from 'axios';
import { Avatar } from "@material-ui/core";
import NotiPanel from "../Noti1/Noti1";

import Menuitems from "./Menuitems";
import './Navbar.css';
//import { find } from '../../../../model/user';

const PanjaiToken = localStorage.getItem('PanjaiToken')
//console.log("PanjaiToken: "+PanjaiToken)
const currentUser = localStorage.getItem('currentUser')
const currentUser_id = localStorage.getItem('currentUser_id')
//console.log("currentUser_id#1: "+currentUser_id)

const data = { currentUser_id }

async function logout() {
    await Axios.post('/authenticate/logout', data, {
    }).then(res => {
        console.log(res);
        if (res.data.name) {
            window.alert("Error")
        } else {
            localStorage.setItem('PanjaiToken', null);
            localStorage.setItem('currentUser', null);
            localStorage.setItem('currentUser_id', null);
            localStorage.setItem('currentUser_email', null);
            window.location.href = "http://localhost:3000"
        }
    }).catch(error => console.log(error))
    console.log("currentUser_id#2: " + currentUser_id)
}


// async function search(){
//     await Axios.post('/Search'+state.find, {
//     }).then(res => {
//         console.log(res)
//     }).catch(error =>{
//         console.log(error)
//     })
// }

class Navbar extends Component {

    state = {

        input: "",
        clicked: false,
        openState: false,
        targetNoti: null
    }


    openNotiPanel = (event) => {
        console.log(event)
        this.setState({ openState: !this.state.openState });
        this.setState({ targetNoti: event.target })

    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })

    }

    search = () => {
        console.log("its work!!")
        console.log(this.state.find)
        Axios.get('/Search/' + this.state.find, {
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (

            <div>
                <nav className="NavbarItems">

                    <Link to="/" className="navbar-logo" >ปันใจ  <i className="fab fa-gratipay"></i></Link>
                    {/* <div className="navbar-logo"><img src="logo.png" width="120px"/></div> */}

                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>

                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {Menuitems.map((item, index) => {
                            if (PanjaiToken == "null") {
                                if (index < 5) {
                                    return (

                                        <li className="itemlist" key={index} >
                                            {/* <a href={"#" + item.id}> */}
                                            <a className={item.cName} href={item.href}>
                                                {item.title}
                                            </a>
                                            {/* </a> */}

                                        </li>

                                    )
                                }
                            }
                            else {
                                return (

                                    <li className="itemlist" key={index} >
                                        {/* <a href={"#" + item.id}> */}
                                        <a className={item.cName} href={item.href}>
                                            {item.title}
                                        </a>
                                        {/* </a> */}

                                    </li>

                                )
                            }
                        })}

                        <li className="itemlist">
                            <If condition={PanjaiToken == "null"}>
                                <Then>
                                    <Link to="/Login" className="hidden">เข้าสู่ระบบ</Link>
                                </Then>
                                <Else>
                                    <Then>
                                        <Link onClick={logout} className="hidden">ออกจากระบบ</Link>
                                    </Then>
                                </Else>
                            </If>
                        </li>
                    </ul>
                    <span className="dropdown position-search">
                        <Link to='/searchResult' className="ssearch" /*type="button" data-toggle="dropdown"*/><i className="fas fa-search"></i></Link>
                        {/* <div className="dropdown-menu dropdown-menu-right">
                            <form>
                                <input 
                                    onChange={(event) =>{
                                        this.setState({find: event.target.value})
                                        //setSearch(event.target.value)
                                    }}
                                    type="Search"
                                    placeholder="ค้นหา...">
                                </input>
                                <button onClick={this.search} type="submit">submit</button>
                            </form>
                        </div> */}
                    </span>
                    {PanjaiToken == "null" ? <span></span> : <span class="noti">
                        <span type="button" className="bell" onClick={(event) => this.openNotiPanel(event)}>
                            <i class="fas fa-bell"></i>
                            {
                                this.state.openState ? <NotiPanel open={this.state.openState} t={this.state.targetNoti} /> : null
                            }

                        </span>
                    </span>
                    }
                    {/* <span class="noti">
                        <span type="button" className="bell" onClick={(event) => this.openNotiPanel(event)}>
                            <i class="fas fa-bell"></i>
                            {
                                this.state.openState ? <NotiPanel open={this.state.openState} t={this.state.targetNoti} /> : null
                            }

                        </span>

                    </span> */}

                    <If condition={PanjaiToken == "null"} >
                        <Then>
                            <Link to="/Login" className="nav-links-mobile"> เข้าสู่ระบบ</Link>
                        </Then>
                        <Else>
                            <Then>
                                {/* <Avatar>{currentUser.charAt(0).toUpperCase()}</Avatar> */}
                                <Link onClick={logout} className="nav-links-mobile"> ออกจากระบบ</Link>
                            </Then>
                        </Else>
                    </If>




                    {/* <div type="button" href="Login" className="nav-links-mobile">เข้าสู่ระบบ</div> */}
                   
                </nav>
               
                {/* <input onChange={(event) => { this.setState({input:event.target.value}); console.log(event,event.target.value) }}></input> */}
       
            </div>

            
        )
    }
}



export default Navbar
