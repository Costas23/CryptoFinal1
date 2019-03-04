
var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

const mongoose = require('mongoose');
const aws = require('aws-sdk');
const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://"+config.database.name+":"+config.database.password+"@ds111754.mlab.com:11754/"+ config.database.db;
const url = 'mongodb://Kostas23:Corazon2393@ds139435.mlab.com:39435/testcrypto';
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

// let DB = new aws.DB({
//   dbusername: process.env.DB_USERNAME,
//   dbpassword: process.env.DB_PASSWORD,
//   dbname: process.env.DB_NAME
// });

// const url = "mongodb://"+DB.dbusername+":"+DB.dbpassword+"@ds111754.mlab.com:11754/"+ DB.dbname;
// console.log(url);

app.set('view engine','ejs');

app.use(session({secret:'ssshhhhh',saveUninitialized:true,resave:false}));


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set(('views', path.join(__dirname, 'views')));

var sess;

mongoose.connect(url,{ useNewUrlParser: true },function(){
    // console.log(db);
    mongoose.connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        }
        else {
            names.forEach(function(e,i,a) {
                // console.log(e.name);
            });
        }
    });
});

app.get('/',function(req,res){
    res.render('index');
})



app.get('/crypto',function(req,res){
    sess = req.session;
    // console.log(sess.crypto);
    if(sess.crypto || sess.crypto==""){
      MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("testcrypto");
      //   console.log(sess.crypto);
        dbo.collection(sess.crypto).find({}).sort({title:1}).toArray(function(err, result) {
          if (err) throw err;
        //   console.log(sess.cryptos);
          var monthyears = [];
          var years=[];
          result.forEach(function(item){
              monthyears.push({year:item.title.substring(0,4),month:item.title.substring(5,7)});
            //   console.log(item.title.substring(0,4)+' '+item.title.substring(5,7));
          })
          monthyears.forEach(function(item){
              if(!years.includes(item.year)){
                years.push(item.year);
              }
          })
          res.render('crypto',{data: monthyears,years:years,crypto:sess.crypto,cryptonames:sess.cryptos});
          result.forEach(function(item){
          // console.log(item);
          })
          db.close();
        });
      });
    }
    else{
        MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("testcrypto");
            dbo.listCollections().toArray(function(err, result) {
                if (err) throw err;
                var cr = [];
                result.forEach(function(item){
                    if(!item.name.toString().includes("system.")){
                    cr.push(item.name);
                    }
                })
                cr.forEach(function(item){
                    // console.log(item);
                })
                
                res.render('crypto',{cryptonames: cr,data:''});
                result.forEach(function(item){
        // console.log(item.name);
                })
                db.close();
            });

        });
    }
});

app.post('/crypto',function(req,res){
  sess= req.session;
  sess.crypto = req.body.crypto;
  sess.cryptos = req.body.cryptos;
// console.log(sess.crypto);
  res.end('done');
})

app.get('/dates',function(req,res){
    sess = req.session;
    // console.log(sess.result);
    if(sess.aggregation=="max"){

      console.log(sess.aggregation+ " " + sess.column + " " + sess.dates);
        // console.log(sess.dates);
        sess.result.forEach(function(item){
            item.date = new Date(item.date);
        })
        res.render('dates',{data: sess.result,crypto:sess.crypto,max:sess.dates,aggregation:sess.aggregation,column: sess.column});
    }else{
    MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("testcrypto");
        // console.log(sess.crypto);
        dbo.collection(sess.crypto).findOne({"title":sess.monthtitle},function(err, result) {
            if (err) throw err;
            // console.log(result);
            datesArr = [];
            result.dates.forEach(function(item){
                datesArr.push(item);
            })
            sess.result = datesArr;
            // console.log(sess.result);
            res.render('dates',{data: sess.result,crypto:sess.crypto,max:sess.dates,aggregation:sess.aggregation,column:sess.column});
            db.close();
          });
        });

    }
})

app.post('/dates',function(req,res){
    sess = req.session;
    sess.monthtitle = req.body.title;
    sess.aggregation = '';
    sess.dates = '';
    res.end('done');
})

app.post('/aggre',function(req,res){
    sess = req.session;
    sess.aggregation = req.body.aggre;
    sess.column = req.body.column;
    // console.log(req.body.aggre);
    
    if(sess.aggregation == 'max'){
  
    var col = '$dates.'+req.body.column;
    // console.log(col);
    MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testcrypto");
    dbo.collection(sess.crypto).aggregate([
    {$match:{'title':sess.monthtitle}},
    {$unwind:'$dates'},
    {$group:{_id:null,max:{$max:col}}},
    {$project:{max:1,_id:0}}
  
  ]).toArray(function(err,arrRes){
    // console.log(arrRes);
 
    arrRes.forEach(function(item){
      sess.dates= item.max;
    })
    // console.log(req.body.aggre +' '+col + ' ' + sess.dates);
    res.end('done');
  });
  });
  }else if(sess.aggregation == 'min'){
  
  var col = '$dates.'+req.body.column;
  // console.log(col);
  MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("testcrypto");
  dbo.collection(sess.crypto).aggregate([
  {$match:{'title':sess.monthtitle}},
  {$unwind:'$dates'},
  {$group:{_id:null,min:{$min:col}}},
  {$project:{min:1,_id:0}}
  
  ]).toArray(function(err,arrRes){
  // console.log(arrRes);
  arrRes.forEach(function(item){
    sess.dates= item.min;
  })
  res.end('done');
  });
  });
  } else {
  
  var col = '$dates.'+req.body.column;
  // console.log(col);
  MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("testcrypto");
  dbo.collection(sess.crypto).aggregate([
  {$match:{'title':sess.monthtitle}},
  {$unwind:'$dates'},
  {$group:{_id:null,avg:{$avg:col}}},
  {$project:{avg:1,_id:0}}
  
  ]).toArray(function(err,arrRes){
  // console.log(arrRes);
  arrRes.forEach(function(item){
    sess.dates= item.avg;
  })
  res.end('done');
  });
  });
  }
  })
  


app.listen(port,function(){
  console.log("now listening to localhost:"+ port);
});
