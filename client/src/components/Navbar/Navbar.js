import { Search } from '@material-ui/icons';
import React, { Component } from 'react';
import Menuitems from "./Menuitems"
import './Navbar.css'


class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })

    }

    render() {
        return (
            <div> <nav className="NavbarItems">
                <h1 className="navbar-logo">ปันใจ <i class="fab fa-gratipay"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {Menuitems.map((item, index) => {
                        return (
                            <li className="itemlist">
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>

                            </li>

                        )
                    })}

                    <li className="itemlist">
                        <a href="" className="hidden">เข้าสู่ระบบ</a>
                    </li>
                </ul>

                <span class="dropdown position-search">
                    <span type="button" data-toggle="dropdown"><i class="fas fa-search"></i></span>
                    <div class="dropdown-menu dropdown-menu-right">
                        <input type="Search" placeholder="ค้นหา..."></input>
                    </div>
                </span>
                <span class="noti">
                    <span type="button" href="" className="bell"><i class="fas fa-bell"></i></span>
                </span>
                <div type="button" href="" className="nav-links-mobile">เข้าสู่ระบบ</div>

            </nav>
            </div>
        )
    }
}




export default Navbar