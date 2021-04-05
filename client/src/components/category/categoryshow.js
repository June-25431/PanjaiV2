import React, { useState, useEffect } from 'react';
import './category.css'
import './categoryshow.css'
import { connect } from 'react-redux';
import * as action from '../../action/postFDT'
import moment from 'moment';
import Form from './Form'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PostFDT from "../foundation/PostFDT";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Fab, withStyles, Typography, IconButton } from '@material-ui/core';
import ButterToast, { POS_RIGHT, POS_TOP, Cinnamon } from "butter-toast";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { DeleteSweep } from "@material-ui/icons";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Redirect } from 'react-router'

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    extendedIcon: {
        marginRight: theme.spacing(0),
    }
});

const DialogTitle2 = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

function Categoryshow({ classes, ...props }) {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [current, setCurrent] = useState(0)
    const currentUser = localStorage.getItem('currentUser')

    useEffect(() => {
        props.fetchAllPostFDT()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenFDT = id => {
        setOpen2(true);
        setCurrent(id);
    };

    const handleCloseFDT = () => {
        setOpen2(false);
    };

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Foundation"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('ต้องการลบโพสนี้ใช่หรือไม่?')) {
            props.deletePostMessage(id, onSuccess)
            window.location.href = "http://localhost:3000/Foundation/" + props.currentId.match.params.name
        }
    }

    console.log(props)

    return (
        <>
            {
                props.postFDTList.filter(fdt => fdt._id == props.currentId.match.params.id).map((record, index) => {
                    return (
                        <>

                            <div className="postfdt">
                                <If condition={currentUser == 'admin'}>

                                    <Then>
                                        <div className="box-box">


                                            <Fab className="botton" size="small" color="back" aria-label="edit" onClick={() => handleClickOpenFDT(record._id)} >
                                                <EditOutlinedIcon />
                                            </Fab>

                                            <Dialog
                                                onClose={handleCloseFDT}
                                                aria-labelledby="customized-dialog-title"
                                                open={open2}
                                            >
                                                <DialogTitle2 id="customized-dialog-title" onClose={handleCloseFDT}>
                                                    แก้ไขข้อมูลโครงการ
                                        </DialogTitle2>

                                                <PostFDT {...{ current, setCurrent }} />
                                                <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
                                            </Dialog>


                                            <Fab className="botton" size="small" color="back" aria-label="add" onClick={() => onDelete(record._id)} >
                                                <DeleteOutlineRoundedIcon />
                                            </Fab>


                                            <div className="Tt">{record.title}</div>

                                            <center>
                                                <div className="image01">
                                                    <img variant="top" src={'http://localhost:3001/Foundation/' + record.image} />
                                                </div>
                                            </center>
                                            <div className="map">
                                                <center><Button className="map" variant="contained" >
                                                    แผนที่
                                            </Button></center>
                                            </div>
                                            <div className="info">{record.message}</div>
                                            <div className="bx">
                                                <div className="logo" ><i className="fab fa-gratipay"></i></div>
                                                <div className="infor">สิ่งของที่ต้องการ : {record.item}</div>
                                                <div className="infor">จำนวน : {record.n_item} บาท</div>
                                                <div className="infor">วันที่ลง : {moment(record.Timestamp).calendar()}</div>

                                            </div>
                                            <center><Button variant="contained" onClick={handleClickOpen}>
                                                บริจาค
                                            </Button></center>

                                            <Dialog
                                                fullScreen={fullScreen}
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="responsive-dialog-title"
                                            >
                                                <DialogTitle id="responsive-dialog-title">บริจาคให้กับ {record.title}</DialogTitle>

                                                <DialogContent>
                                                    <DialogContentText>
                                                        <Form {...record} />
                                                    </DialogContentText>
                                                </DialogContent>

                                                <DialogActions>
                                                    <Button onClick={handleClose} color="primary">
                                                        ยกเลิก
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Then>
                                    <Else>
                                        <div className="box-box">
                                            <div className="Tt">{record.title}</div>

                                            <center>
                                                <div className="image01">
                                                    <img variant="top" src={'http://localhost:3001/Foundation/' + record.image} />
                                                </div>
                                            </center>
                                            <div className="map">
                                                <center><Button className="map" variant="contained" >
                                                    แผนที่
                                            </Button></center>
                                            </div>
                                            <div className="info">{record.message}</div>
                                            <div className="bx">
                                                <div className="logo" ><i className="fab fa-gratipay"></i></div>
                                                <div className="infor">สิ่งของที่ต้องการ : {record.item}</div>
                                                <div className="infor">จำนวน : {record.n_item} บาท</div>
                                                <div className="infor">วันที่ลง : {moment(record.Timestamp).calendar()}</div>

                                            </div>
                                            <center><Button variant="contained" onClick={handleClickOpen}>
                                                บริจาค
</Button></center>

                                            <Dialog
                                                fullScreen={fullScreen}
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="responsive-dialog-title"
                                            >
                                                <DialogTitle id="responsive-dialog-title">บริจาคให้กับ {record.title}</DialogTitle>

                                                <DialogContent>
                                                    <DialogContentText>
                                                        <Form {...record} />
                                                    </DialogContentText>
                                                </DialogContent>

                                                <DialogActions>
                                                    <Button onClick={handleClose} color="primary">
                                                        ยกเลิก
        </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Else>

                                </If>
                            </div>

                        </>
                    );
                })
            }
        </>
    );
}

const mapStateToProps = state => ({
    postFDTList: state.postFDT.list
})

const mapActionToProps = {
    fetchAllPostFDT: action.fetchAll,
    deletePostMessage: action.Delete
}


export default connect(mapStateToProps, mapActionToProps)(Categoryshow);
//export default Categoryshow;