import React, { Component, useEffect } from 'react';
import './category.css'
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as action from '../../action/postFDT'
import moment from 'moment';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

function category(props) {
    return (

        <div className="dek" >

            {/* <div className="box"> */}
                <div className="box-white">
                    <div className="Title"><i className="fab fa-gratipay"></i>เด็กและเยาวชน<i className="fab fa-gratipay"></i></div>
                    {/* <i className="fab fa-gratipay"></i> */}
                    <div className="foundation">
                        <div className="row m-0">
                            <div className="column col-4">
                                <Card className="foundat">
                                    <Card.Img variant="top" src="/1.1.jpg" />
                                    <Card.Body>
                                        <Link to="/category" className="Tfound">เด็กและเยาวชน</Link>
                                        <div className="information">thrfg</div>

                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="column col-4">
                                <Card className="foundat">
                                    <Card.Img variant="top" src="/1.2.jpg" />
                                    <Card.Body className="">
                                        <Link to="/profile" className="Tfound">ผู้สูงอายุ</Link>
                                        <div className="information">thrfg</div>

                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="column col-4">
                                <Card className="foundat">
                                    <Card.Img variant="top" src="/1.3.jpg" />
                                    <Card.Body>
                                        <Link to="/profile" className="Tfound">ผลิตสื่อนวัตกรรมการเรียนรู้วิทยาศาสตร์ สำหรับนักเรียนระดับมัธยมศึกษา</Link>
                                        <div className="information">thrfg</div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>


                    </div>
                </div>
{/* 
            </div> */}
        </div>

function Category({ classes, ...props }) {

    useEffect(() => {
        props.fetchAllPostFDT()
    }, [])

    return (
        <>
            <div className="dek">
                <div>.</div>
                <div className="box">
                    <div className="Title"><i className="fab fa-gratipay"></i>{props.currentId.match.params.name}<i className="fab fa-gratipay"></i></div>
                    {/* <i className="fab fa-gratipay"></i> */}
                    <div className="foundation">
                        <div className="row m-0">
                            {
                                props.postFDTList.filter(fdt => fdt.category == props.currentId.match.params.name).map((record, index) => {
                                    return (
                                        <div className="column col-4">
                                            <Card className="foundat">
                                                <Card.Img variant="top" src={'http://localhost:3001/Foundation/' + record.image} />
                                                <Card.Body>
                                                    <Link to="/category" className="Tfound">{record.title}</Link>
                                                    <div className="information">{record.item}</div>
                                                    <div className="information">{record.n_item}</div>
                                                    <div className="information">{moment(record.Timestamp).calendar()}</div>
                                                    <Link to={"/Foundation/"+props.currentId.match.params.name+"/"+record._id} className="CardTitle">อ่านเพิ่มเติม</Link>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    postFDTList: state.postFDT.list
})

const mapActionToProps = {
    fetchAllPostFDT: action.fetchAll,
    fetchPostFDT: action.fetchById,
    deletePostMessage: action.Delete
}

export default connect(mapStateToProps, mapActionToProps)(Category);