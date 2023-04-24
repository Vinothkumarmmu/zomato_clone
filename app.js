var express = require('express');
const mongoose= require('mongoose');
var app = express();
var env=require('dotenv').config();
port =process.env.Port || 8900;
const cors=require("cors");
const body =require('body-parser');
app.use(body.urlencoded({extended:true}));
app.use(body.json({limit:'10mb'}));
app.use(cors());

var data=process.env.mongoURI;
mongoose.connect(data,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

var db=mongoose.connection;

db.on("error",console.error.bind(console,"MongoDB Connection Error:"));

var route = require('./router');
app.use('/', route);

app.listen(port, () => {
    console.log(`API's running on port ${port}`);
});

