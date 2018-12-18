// var express = require('express');
// var router = express.Router();
// var connection=require('../config/connection');
var SunCalc = require('suncalc');

function sunCalc(req, res, next) {

    var setDate=new Date("2019-01-01");
    // var todaySunCalc=SunCalc.getTimes( today,6.927079,79.861244);
    // var sunrise=todaySunCalc.sunrise.toString();
    // var sunset=todaySunCalc.sunset.toString();
    // console.log(sunrise.slice(16,21));
    // console.log(sunset.slice(16,21));
 
    for(var i=0; i<365; i++){
        var today=new Date(setDate.getTime()+(1000*60*60*24*i));
        var todaySunCalc=SunCalc.getTimes( today,6.927079,79.861244);
        var sunrise=todaySunCalc.sunrise.toString();
        var sunset=todaySunCalc.sunset.toString();
        console.log(today);
        console.log(sunrise.slice(16,21));
        console.log(sunset.slice(16,21));
        console.log('--------------');
    }

        // res.json({type: true, msg:SunCalc.getTimes( tomorrow,0.137411517,1.409733853)}
 
 }

 module.exports.sunCalc = sunCalc