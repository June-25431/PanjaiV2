const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const mongoose = require("mongoose");
// const middleware = require('../middleware/index');

var { PostPanjai } = require('../model/postPanjai')
const user = require('../model/user');
const noti = require('../model/notification');
const recieve = require('../model/recieve');

const storage = multer.diskStorage({
    destination: './public/uploads/Too-Panjai',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.gif' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Only image is allowed'), false)
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

router.get('/', (req, res) => {
    PostPanjai.find({}, (err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #1 : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', upload.single('image'), (req, res) => {
    var newRecord = new PostPanjai({
        title: req.body.title,
        message: req.body.message,
        contect: req.body.contect,
        location: req.body.location,
        image: req.file.filename,
        creator : req.body.creator
    })
    console.log(newRecord)
    newRecord.save((err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #2 : ' + JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message,
        contect: req.body.contect,
        location: req.body.location
    }

    PostPanjai.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, { new: true }, (err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #3 : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No #4 : ' + req.params.id)

    PostPanjai.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #5 : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/addFav/:id', (req, res) => {
    console.log("Post_id: "+req.params.id)
    console.log("currentuser_id: "+req.body.currentUser_id)

    user.findByIdAndUpdate(req.body.currentUser_id, { $addToSet: { favorite: req.params.id } }, function(error,update){
        if(error){
            console.log(error)
        }
    })
})

router.post('/addRequest/:id',async function(req, res){
    console.log("Post_id: "+req.params.id)
    console.log("currentuser_id: "+req.body.currentUser_id)

    user.findByIdAndUpdate(req.body.currentUser_id, { $addToSet: { request: req.params.id } },await function(error,update){
        if(error){
            console.log(error)
        }
    })

    // const Post = PostPanjai.findById(req.params.id,await function(error,done){
    //     if(error){
    //         console.log(error)
    //     }else{
    //         //console.log(done)
    //     }
    // })
    let post = await PostPanjai.aggregate([
        {
            $match: {
                _id : mongoose.Types.ObjectId(req.params.id)
            }
        },
    ])
    //console.log(post)
    let owner_id = await user.aggregate([
        {
            $match: {
                username : post[0].creator
            }
        },
    ])
    console.log(owner_id)
    noti.create({
        owner : owner_id[0].username,
        requester : req.body.currentUser,
        notification : post[0].title,
    })
})

router.post('/notifications/:id',async function(req, res){
    //console.log("Id:"+req.params.id)
    let find = await user.aggregate([
        {
            $match: {
                _id : mongoose.Types.ObjectId(req.params.id)
            }
        }
    ])
    //console.log(find)
    let result = await noti.aggregate([
        {
            $match: {
                "owner" : find[0].username
            }
        }
    ])
    //const result2 = [result[0].owner[0].username, result[0].requester[0].username, result[0].notification[0].title]
    //console.log(result)
    res.send(result)
})

router.post('/recieveAccept',async function(req, res){
    let owner_id = await user.aggregate([
        {
            $match: {
                username : req.body.username
            }
        },
    ])

    //console.log(owner_id)
    recieve.create({
        to : req.body.sendTo,
        owner : owner_id[0].username,
        owner_contact : owner_id[0].phone,
        item : req.body.item,
    })
    // recieve.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )

    noti.findByIdAndDelete(req.body.notiId, function(error,remove){
        if(error){
            console.log(error)
        }
    })
})

router.post('/recieveDeny',async function(req, res){
    noti.findByIdAndDelete(req.body.notiId, function(error,remove){
        if(error){
            console.log(error)
        }
    })
})

router.post('/deleteRecieve',async function(req, res){
    recieve.findByIdAndDelete(req.body.recieveId, function(error,remove){
        if(error){
            console.log(error)
        }
    })
})

router.post('/findRecieve/:id',async function(req, res){
    //console.log("Id:"+req.params.id)
    let find = await user.aggregate([
        {
            $match: {
                _id : mongoose.Types.ObjectId(req.params.id)
            }
        }
    ])
    //console.log(find)
    let result = await recieve.aggregate([
        {
            $match: {
                "to" : find[0].username
            }
        }
    ])
    //const result2 = [result[0].owner[0].username, result[0].requester[0].username, result[0].notification[0].title]
    //console.log(result)
    res.send(result)
})

module.exports = router