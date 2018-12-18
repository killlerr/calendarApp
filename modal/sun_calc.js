var express = require('express');
var router = express.Router();
var connection=require('../config/connection');
var SunCalc = require('suncalc');

function test(req, res, next) {
    var sql = "INSERT INTO date_info (sunrise, sunset) VALUES ('1', '2')";
    connection.ConnectDatabase.db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

}  
function sunCalc(req, res, next) {

    var setDate=new Date("2019-01-01");
    var todaySunCalc=SunCalc.getTimes(setDate,6.927079,79.861244);
    var sunrise=todaySunCalc.sunrise.toString();
    var sunset=todaySunCalc.sunset.toString();
    console.log(sunrise.slice(16,21));
    console.log(sunset.slice(16,21));
    let post = {sunrise: sunrise, sunset:sunset};
    let sql = 'update sunrise/sunset time?';
    db.run(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post 1 added'); g
    });
 
    // for(var i=0; i<365; i++){
    //     var today=new Date(setDate.getTime()+(1000*60*60*24*i));
    //     var todaySunCalc=SunCalc.getTimes( today,6.927079,79.861244);
    //     var sunrise=todaySunCalc.sunrise.toString();
    //     var sunset=todaySunCalc.sunset.toString();
    //     console.log(today);
    //     console.log(sunrise.slice(16,21));
    //     console.log(sunset.slice(16,21));
    //     console.log('--------------');
    // }

        // res.json({type: true, msg:SunCalc.getTimes( tomorrow,0.137411517,1.409733853)}
 
 }

 module.exports.test = sunCalc

//  module.exports.sunCalc = sunCalc