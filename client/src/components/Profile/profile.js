import React, { useState, useEffect } from 'react';
import './profile.css'
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {

    const currentUserID = localStorage.getItem("currentUser_id")
    const [allInform, setAllInform] = useState("");
    // false = ยังไม่ได้กด edit
    const [edit, setedit] = useState(false);
    //ข้อมูลโปรไฟล์
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [name, setName] = useState();

    Axios.get('/profile/information/' + currentUserID, {
    }).then(res => {
        // console.log(res)
        setAllInform(res.data)
    }).catch(error => console.log(error))

    const CancelUpdate = () => {
        setedit(false);
    }

    function handleEditProfile() {
        setedit(true);
    }

    // อัพเดตโปรไฟล์
    const confirmUpdate = (event) => {

        const data = [phone, address]
        Axios.post('/profile/update/' + currentUserID, data, {
        }).then(res => {
            console.log(res)
            window.location.href = "http://localhost:3000/profile/" + currentUserID
        }).catch(error => console.log(error))
    }

    function Myfav() {
        Axios.post('/profile/favorite/' + currentUserID, {
        }).then(res => {
            console.log(res);
            window.location.href = "http://localhost:3000/profile/favorite"
        }).catch(error => console.log(error))
    }


    return (
        <div className="back">
        <div className="container">
            <div className="box">
                <section>
                    {edit ?
                        //สามารถแก้ไขๆด้
                        (
                            <div>
                                <div className="box-text">
                                    <h1> ประวัติส่วนตัว</h1>
                                    <div className="textinforuser">
                                        <span> <i className="fa fa-user"> </i> ชื่อ-นามสกุล</span>
                                        <input 
                                        type="text" 
                                        name='name' 
                                        onChange={(e) => { setName(e.target.value) }}></input>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-phone"> </i> เบอร์โทรศัพท์</span>
                                        <input 
                                        type="text" 
                                        name='phone' 
                                        placeholder={allInform.phone}
                                        onChange={(e) => { setPhone(e.target.value) }}></input>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-address-card"> </i> ที่อยู่</span>
                                        <input 
                                        type="text" 
                                        name='address'
                                        placeholder={allInform.address} 
                                        onChange={(e) => { setAddress(e.target.value) }}></input>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-envelope"> </i> อีเมล</span>
                                        <p>{allInform.email}</p>
                                    </div>

                                    <div className="confirm-and-cancelEditProfile">
                                        <div className="confirmEditProfile">
                                            <button className="button" onClick={confirmUpdate}>บันทึก</button>
                                        </div>
                                        <div className="cancelEditProfile">
                                            <button className="button" onClick={CancelUpdate}>ยกเลิก</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )

                        :
                        //ข้อมูลปกติ
                        (
                            <div>
                                <div className="box-text">
                                    <h1> ประวัติส่วนตัว</h1>
                                    <div className="textinforuser">
                                        <span> <i className="fa fa-user"> </i> ชื่อ-นามสกุล </span>
                                        <p>W8</p>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-phone"> </i> เบอร์โทรศัพท์</span>
                                        <p>{allInform.phone}</p>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-address-card"> </i> ที่อยู่</span>
                                        <p>{allInform.address}</p>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-envelope"> </i> อีเมล</span>
                                        <p>{allInform.email}</p>
                                    </div>


                                    <div className="btn-bottom-profile">
                                        <div className="EditProfile">
                                            <button className="button" onClick={handleEditProfile}>แก้ใข</button>
                                        </div>
                                        <div className="Like">
                                            <button onClick={Myfav}><i className="fab fa-gratipay"></i></button>
                                            {/* <Link  to={item.href}></Link> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )

                    }
                </section>


            </div>
            <div className="Post">
                <p>Post ของฉัน </p>
            </div>
        </div>
        </div>

    )
}




export default Profile;