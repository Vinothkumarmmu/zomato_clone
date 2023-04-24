var express = require('express');
var router =express.Router();
// var par= require('body-parser');
// var fs =require('fs');

var control= require('./controller/rest');
var control1= require('./controller/loc');
var control2=require('./controller/mealty');
var control3= require('./controller/user');
// var control3= require('./controller/post')

router.get('/getallrest',control.getAllRestaurants);

router.get('/getallloc',control1.getAllLocations);

router.get('/getallrest/:id',control.fetchingLocation);

router.get('/getallrest1/:details',control.clickingRest);
//router.get('/restaurant/:resid',control.clickingRest);

router.get('/getallmeal',control2.getAllMealTypes);

router.get('/api/search',control.api);

router.post('/api/signup',control3.signUp);

router.get('/api/signin',control3.signIn);

router.get('/api/delete',control3.deleteId);



// router.get("/getallloc/:city",control1);

// router.get('/postrest',control3);

module.exports = router;