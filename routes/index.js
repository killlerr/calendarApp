var express = require('express');
var router = express.Router();
var connection = require('../config/connection');
var mysql = require('mysql');
var ArrayList = require('arraylist')

router.get('/home/:date', function (req, res, next) {

    var date = req.params.date;
    var get_all = 'SELECT * FROM horoscopes WHERE date=' + mysql.escape(date);

    connection.query(get_all, function (err, result) {
        if (err) throw err;
        var special_date_id = result[0].special_date_id;

        if (special_date_id != 1) {
            var get_special_date = 'SELECT description,image_url FROM special_dates WHERE id=' + mysql.escape(special_date_id);
        }
        else {
            var get_special_date = 'SELECT description,image_url FROM special_dates WHERE id=1';
        }
        connection.query(get_special_date, function (err, rows) {
            if (err) throw err;
            res.json({type: true, rows, result});
        })

    });

});

router.get('/compass/:date', function (req, res) {
    var date = req.params.date;

    var get_disha = 'SELECT suba_dishawa,maru_dishawa FROM horoscopes WHERE date=' + mysql.escape(date);
    connection.query(get_disha, function (err, result) {
        if (err) throw err;
        res.json({type: true, result})
    })

});

router.get('/calender/:year/:month', function (req, res) {

    var year = req.params.year;
    var month = req.params.month;
    var dates='SELECT category_id,day(date) as day FROM horoscopes WHERE month(date)=? AND year(date)=?';

    connection.query(dates,[month,year],function (err,result) {
        if(err)throw err;
        res.json({type: true,result});
    });
});

router.get('/special_dates/:year/:ln',function (req,res) {

    var year = req.params.year;
    var language = req.params.ln;

    var years='SELECT special_date_id FROM horoscopes WHERE year(date)=?';

    connection.query(years,[year],function (err,result) {

        if(err)throw err;
        const array=[];

     for(var i=0;i<result.length;i++){
            var special_date_id=result[i].special_date_id;

            var special_dates='SELECT name_en as name FROM special_dates WHERE id='+mysql.escape(special_date_id);
            connection.query(special_dates,function (err,rows) {
                if(err) throw err;
            array.push(rows)
            })
        }
        res.json({type: true,array});

    });


});



module.exports = router;