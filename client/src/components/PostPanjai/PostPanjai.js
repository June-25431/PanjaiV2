import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../action/postPanjai'
import { Divider, Grid, Paper, Typography, withStyles, List, ListItem, ListItemText, Button,makeStyles } from '@material-ui/core';
import PostPanjaiForm from './PostPanjaiForm'
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';



const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: {
        margin: theme.spacing(1),
        background: 'rgba(187, 130, 44, 0.925)'
    },
    smMargin1: {
        margin: theme.spacing(1),
        background: '#a13800'
    },
    actionDiv: {
        textAlign: "center"
    },
    post1: {

        borderRadius: 5,
        boxShadow: '0 5px 6px 5px rgba(187, 130, 44, 0.925)',
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
    }

})

const PostPanjai = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostPanjai()
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

    return (
        <>
            <Grid container justify="center">
                <Grid item lg={12}>
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
                                                
                                                <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
                                                    {record.title}
                                                </Typography>

                                                <div className={classes.frontpost}>
                                                    ข้อมูล : {record.message}
                                                </div>
                                                <Grid container justify="center">
                                                    <div className={classes.frampicture} >
                                                        <img src={'http://localhost:3001/image/' + record.image} className={classes.picture} />
                                                    </div>
                                                </Grid>
                                                <div className={classes.frontpost}>
                                                    เวลาที่ลง : {moment(record.Timestamp).calendar()}
                                                </div>
                                                <div className={classes.frontpost}>
                                                    โทร : {record.contect}
                                                </div>
                                                <div className={classes.frontpost}>
                                                    {record.location}
                                                </div>
                                                <Grid container justify="center">
                                                    <div className={classes.botton1}>
                                                        <Button variant="contained" color="primary" size="small"
                                                            className={`${classes.smMargin} ${classes.frontpost}`}// จำเป็น
                                                            onClick={() => setCurrentId(record._id)}>
                                                            แก้ไข
                                                    </Button>
                                                        <Button variant="contained" color="secondary" size="small"
                                                            className={`${classes.smMargin1} ${classes.frontpost}`}
                                                            onClick={() => onDelete(record._id)}>
                                                            ลบ
                                                    </Button>
                                                    </div></Grid>

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
    deletePostMessage: action.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPanjai));