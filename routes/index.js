var express = require('express');
var router = express.Router();
var connection = require('../config/connection');
var mysql = require('mysql');


router.get('/today/:year', function (req, res, next) {
    var year = req.params.year;
    var array=[];
    //var get_all = 'SELECT date,sunrise,sunset,rahu_morning_start,rahu_morning_end,rahu_night_start,rahu_night_end,suba_dishawa,maru_dishawa,description,image_url,special_date_id_1,special_date_id_2 FROM horoscopes,special_dates WHERE horoscopes.special_date_id_1=special_dates.id AND year(date)=? OR horoscopes.special_date_id_2=special_dates.id AND year(date)=?';
    var get_all = 'SELECT * FROM horoscopes WHERE year(date)='+mysql.escape(year);
    connection.query(get_all, function (err, result) {
        if(err)throw err;
        f(result);
});

    async function f(result) {

        let promise = new Promise((resolve, reject) => {

            for(var i=0;i<result.length;i++){

                var special_date_id_1 = result[i].special_date_id_1;
                var special_date_id_2 = result[i].special_date_id_2;

                var a='SELECT image_url FROM special_dates WHERE id=? AND(id)!=? OR id=? AND (id)!=?';
                    connection.query(a,[special_date_id_1,0,special_date_id_2,0],function (err,row) {
                        array.push(row);
                    })
                }
                resolve(array);
        });
        promise.resolve().then(res.json({array}));

        /*let bb = await promise; // wait till the promise resolves (*)

        res.json({bb});*/
    }




 /*connection.query(get_all,[year,year], function (err, result) {
   if (err) throw err;
res.json({result});
 /!* for(var i=0;i<result.length;i++){
             var special_date_id_1 = result[i].special_date_id_1;
             var special_date_id_2 = result[i].special_date_id_2;

             if(special_date_id_1!=0&& special_date_id_2==0){

                 var a='SELECT image_url FROM special_dates WHERE id=?';
             connection.query(a,[special_date_id_1],function (err,row) {

                 array.push(result[i]);
                 array.push(row);
             })
             }
             else if(special_date_id_1==0&& special_date_id_2!=0){

                 var a='SELECT image_url FROM special_dates WHERE id=?';
                 connection.query(a,[special_date_id_2],function (err,row) {

                     array.push(result[i]);
                     array.push(row);
                 })
             }
         }*!/
      // res.json({array});
 });*/
});

router.get('/month_images/:month', function (req, res, next) {
    var month = req.params.month;
    var image = 'SELECT image_url FROM month_images WHERE month=' + mysql.escape(month);
    connection.query(image, function (err, result) {
        if (err) throw err;
        res.json({image: result});
    });
});


router.get('/compass/:date', function (req, res) {
    var date = req.params.date;
    var month = (req.params.date).slice(5, 7);
    var get_disha = 'SELECT suba_dishawa,maru_dishawa,special_date_id_1,special_date_id_2 FROM horoscopes WHERE date=' + mysql.escape(date);

    connection.query(get_disha, function (err, result) {
        if (err) throw err;
        var special_date_id_1 = result[0].special_date_id_1;
        var special_date_id_2 = result[0].special_date_id_2;

        if (special_date_id_1 != 0 || special_date_id_2 != 0) {

            var is_special=true;
            var special_dates = 'SELECT description,image_url FROM special_dates WHERE id=? AND (id)!=? OR id=? AND (id)!=?';
            connection.query(special_dates, [special_date_id_1,0, special_date_id_2,0], function (err, rows) {
                if (err) throw err;
                res.json({is_special,suba_disha: result, special_dates: rows});
            })
        } else {
            var is_special=false;
            var get_month = 'SELECT image_url FROM month_images WHERE month=?';

            connection.query(get_month, [month], function (err, rows) {
                if (err) throw err;
                res.json({is_special,suba_disha: result, monthly_image: rows});
            })
        }

    })

});

router.get('/calender/:year/:month', function (req, res) {

    var year = req.params.year;
    var month = req.params.month;
    var dates = 'SELECT date,category_id_1,category_id_2,category_id_3,category_id_4 FROM horoscopes,special_dates WHERE horoscopes.special_date_id_1=special_dates.id AND month(date)=? AND year(date)=? OR horoscopes.special_date_id_2=special_dates.id AND month(date)=? AND year(date)=? ';

    connection.query(dates, [month, year,month, year], function (err, result) {
        if (err) throw err;
        res.json({type: true, categories: result});
    });
});

router.get('/special_dates/:year/:ln', function (req, res) {

    var year = req.params.year;
    var language = req.params.ln;

    switch (language) {
        case 'en':
            var special_dates = 'SELECT date,month(date) AS month ,name_en as name FROM horoscopes,special_dates WHERE horoscopes.special_date_id_1=special_dates.id AND year(date)=? AND (special_date_id_1)!=? OR horoscopes.special_date_id_2=special_dates.id AND year(date)=? AND (special_date_id_2)!=? ';
            break;
        case 'si':
            var special_dates = 'SELECT date,month(date) AS month ,name_si as name FROM horoscopes,special_dates WHERE horoscopes.special_date_id_1=special_dates.id AND year(date)=? AND (special_date_id_1)!=? OR horoscopes.special_date_id_2=special_dates.id AND year(date)=? AND (special_date_id_2)!=? ';
            break;
        case 'ta':
            var special_dates = 'SELECT date,month(date) AS month ,name_ta as name FROM horoscopes,special_dates WHERE horoscopes.special_date_id_1=special_dates.id AND year(date)=? AND (special_date_id_1)!=? OR horoscopes.special_date_id_2=special_dates.id AND year(date)=? AND (special_date_id_2)!=? ';
            break;

    }
    connection.query(special_dates, [year,0, year,0], function (err, data) {
        groupBy("month", data);

    });
    function groupBy(key, array) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            var added = false;
            for (var j = 0; j < result.length; j++) {
                if (result[j][key] == array[i][key]) {
                    result[j].items.push(array[i]);
                    added = true;
                    break;
                }
            }
            if (!added) {
                var entry = {items: []};
                entry[key] = array[i][key];
                entry.items.push(array[i]);
                result.push(entry);
            }
        }
        res.json({result});
    }

});

module.exports = router;