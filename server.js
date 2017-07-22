const express = require("express");
const bp = require("body-parser");

const todoTable = require("./todoDB");

var app = express();

//show html files
app.use('/',express.static(__dirname) );

//Add new todo stuff
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.post('/todo',function (req,res,next) {
    todoTable.create({
        task: req.body.task,
        done: req.body.done
    })
        .then(function (){
            console.log("inserted");
            res.send({
                success: true
            })
        }).catch(function (){
        console.log("error inserting");
        res.send({
            success: false
        })
    } )
});

//show all stuff
app.get("/todo",function (req,res,next) {
    console.log("All lists requested");
    todoTable.findAll()
        .then(function (data) {
            // console.log("data from findall: ",data);
            res.send(data);
        })
        .catch(function (err) {
            console.log("couldn't send due to: ",err);
        })
});

//clr done stuff
app.get('/todoclr',function (req,resp,next) {
    todoTable.destroy({
        where: {
            done: true
        }
    })
        .then(function (data) {
            resp.send("success");
        })
        .catch(function () {
            resp.send("fail");
        })
});

//delete single todo
app.get('/todosoloclr/:id',function (req,resp) {
    todoTable.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function () {
            resp.send("success");
        })
        .catch(function () {
            resp.send("fail");
        })
});

//update when done
app.post('/todoupdt',function (req,res) {
    console.log(req.body);
    todoTable.update({
        done: req.body.done
    },{
        where: {
            id: req.body.id
        }
    })
        .then(function () {
            res.send("success");
        })
        .catch(function () {
            res.send("success");
        })
});

//404 Handler
app.use(function (req,resp,next) {
    resp.send("404 Not Found");
});

//listen to port
app.listen(3333,function () {
    console.log("Server is running on port 3333...");
});