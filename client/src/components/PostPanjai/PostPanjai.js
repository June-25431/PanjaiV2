import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../action/postPanjai'
import { Divider, Grid, Paper, Typography, withStyles, List, ListItem, ListItemText, Button, makeStyles } from '@material-ui/core';
import PostPanjaiForm from './PostPanjaiForm'
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep, AccessAlarm, ThreeDRotation, AssignmentTurnedIn } from "@material-ui/icons";
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { If, Then,ElseIf, Else } from 'react-if-elseif-else-render';
import Icon from '@material-ui/core/Icon';
import Axios from 'axios';

const currentUser = localStorage.getItem('currentUser')
const currentUser_id = localStorage.getItem('currentUser_id')



const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: {
        "&:hover": {
            backgroundColor: "rgba(85, 52, 4, 0.925)"
        },
        margin: theme.spacing(1),
        background: 'rgba(187, 130, 44, 0.925)'
    },
    smMargin1: {
        "&:hover": {
            backgroundColor: "rgba(85, 52, 4, 0.925)"
        },
        margin: theme.spacing(1),
        background: '#a13800'
    },
    actionDiv: {
        textAlign: "center"
    },
    post1: {

        borderRadius: 5,
        boxShadow: '0 2px 3px 2px rgba(85, 52, 4, 0.925)',
        height: 'auto',
        padding: '30px 30px',
        marginBlock: '15px'

    },
    framepost: {
        // background: '#f9a825',
        borderRadius: 5,
        boxShadow: '0 2px 3px 2px rgba(187, 130, 44, 0.925)',
        color: 'rgba(187, 130, 44, 0.925)',
        height: 'auto',
        padding: '10px 10px',
        marginBlock: '15px'
    },
    frampicture: {
        padding: '10px 10px'

    },
    picture: {
        height: '150px',
        width: 'auto',
        margin: '10px auto',


    },
    frontpost: {
        fontFamily: 'mali',
        borderRadius: '50px'
    },
    color1: {
        color: '#a13800'
    },
    judjudjud: {
        marginLeft: '75px'

    },

})

const options = [
    'แก้ไข',
    'ลบโพสต์',
    'รายงานโพสต์'

];

const ITEM_HEIGHT = 48;

const PostPanjai = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostPanjai()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="ตู้ปันใจ"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('ต้องการลบโพสนี้ใช่หรือไม่?'))
            props.deletePostMessage(id, onSuccess)
    }

    const ScrollToTop = id => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        setCurrentId(id);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const favoriteItem = id => {
        // const onSuccess = () => {
        //     ButterToast.raise({
        //         content: <Cinnamon.Crisp title="ตู้ปันใจ"
        //             content="Submitted successfully"
        //             scheme={Cinnamon.Crisp.SCHEME_PURPLE}
        //             icon={<AssignmentTurnedIn />}
        //         />
        //     })
        // }
        // props.createPostPanjai(id, onSuccess)
        // const formData = new FormData();
        // formData.append('currentUser', currentUser_id);
        // console.log(JSON.stringify(formData))
        const data = {currentUser_id}
        Axios.post('/Too-Panjai/addfav/'+id, data,{
        }).then(res => {
            console.log(res)
            // if(res.data.name) {
            //     window.alert("Error: "+res.data.message)
            //     console.log("error")
            // } else {
            //     window.location.href = "http://localhost:3000/Login"
            // }
        }).catch(error => console.log(error))
    }

    return (
        <>
            <Grid container justify="center">
                <Grid item lg={4}>
                    {/* กรอบโพส */}
                    <Paper className={classes.post1}>
                        <PostPanjaiForm {...{ currentId, setCurrentId }} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                {/* ฝั่งขวา ใช้ classes.ชื่ออื่่น */}
                {
                    props.postPanjaiList.map((record, index) => {
                        return (
                            <Grid item xs={12} sm={4} >
                                <Paper className={classes.framepost}>
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>

                                                <Grid container>
                                                    <Grid item xs={8}>
                                                        <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
                                                            {record.title}

                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={4}>

                                                        {/* จุด3จุด */}
                                                        <span>
                                                            <IconButton
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true"
                                                                onClick={handleClick}
                                                                className={classes.judjudjud}
                                                            >
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                            <Menu
                                                                id="long-menu"
                                                                anchorEl={anchorEl}
                                                                keepMounted
                                                                open={open}
                                                                onClose={handleClose}
                                                                PaperProps={{
                                                                    style: {
                                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                                        width: '20ch',
                                                                    },
                                                                }}
                                                            >
                                                                {options.map((option) => (
                                                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </Menu>

                                                        </span>
                                                    </Grid>
                                                </Grid>

                                                <div className={classes.frontpost}>
                                                    ข้อมูล : {record.message}
                                                </div>
                                                <Grid container justify="center">
                                                    <div className={classes.frampicture} >
                                                        <img src={'http://localhost:3001/image/' + record.image} className={classes.picture} />
                                                    </div>
                                                </Grid>
                                                <div className={`${classes.color1} ${classes.frontpost}`}>
                                                    เวลาที่ลง : {moment(record.Timestamp).calendar()}
                                                </div>
                                                <div className={`${classes.color1} ${classes.frontpost}`}>
                                                    โทร : {record.contect}
                                                </div>
                                                <div className={`${classes.color1} ${classes.frontpost}`}>
                                                    จังหวัด : {record.location}
                                                </div>
                                                <div className={`${classes.color1} ${classes.frontpost}`}>
                                                    ผู้สร้าง : {record.creator}
                                                </div>

                                                <Grid container justify="center">
                                                    <div className={classes.botton1}>

                                                        <If condition={currentUser == record.creator}>
                                                            <Then>
                                                                <Button variant="contained" color="primary" size="small"
                                                                    className={`${classes.smMargin} ${classes.frontpost}`}// จำเป็น
                                                                    onClick={() => ScrollToTop(record._id)}>
                                                                    แก้ไข
                                                                </Button>
                                                                <Button variant="contained" color="secondary" size="small"
                                                                    className={`${classes.smMargin1} ${classes.frontpost}`}
                                                                    onClick={() => onDelete(record._id)}>
                                                                    ลบ
                                                                </Button>
                                                            </Then>

                                                            <ElseIf condition={currentUser == 'admin'}>
                                                                <Button variant="contained" color="primary" size="small"
                                                                    className={`${classes.smMargin} ${classes.frontpost}`}// จำเป็น
                                                                    onClick={() => ScrollToTop(record._id)}>
                                                                    แก้ไข
                                                                </Button>
                                                                <Button variant="contained" color="secondary" size="small"
                                                                    className={`${classes.smMargin1} ${classes.frontpost}`}
                                                                    onClick={() => onDelete(record._id)}>
                                                                    ลบ
                                                                </Button>
                                                            </ElseIf>
                                                            
                                                            <Else>
                                                                <Button variant="contained" color="primary" size="small"
                                                                    className={`${classes.smMargin} ${classes.frontpost}`}// จำเป็น
                                                                >
                                                                    ขอรับ
                                                                </Button>
                                                                <Button variant="contained" color="secondary" size="small"
                                                                    className={`${classes.smMargin1} ${classes.frontpost}`}
                                                                    onClick={() => favoriteItem(record._id)}
                                                                >
                                                                    ถูกใจ
                                                                </Button>
                                                            </Else>
                                                        </If>

                                                    </div>
                                                </Grid>


                                                {/* รูปแบบช่อง */}
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component='li' />
                                    </Fragment>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
}

const mapStateToProps = state => ({
    postPanjaiList: state.postPanjai.list
})

const mapActionToProps = {
    fetchAllPostPanjai: action.fetchAll,
    deletePostMessage: action.Delete,
    createPostPanjai: action.create
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPanjai));