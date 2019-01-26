
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://Kostas23:Corazon2393@ds111754.mlab.com:11754/cryptocurrencies";
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

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
        var dbo = db.db("cryptocurrencies");
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
            var dbo = db.db("cryptocurrencies");
            dbo.listCollections().toArray(function(err, result) {
                if (err) throw err;
                var cr = [];
                result.forEach(function(item){
                    cr.push(item.name);
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
        console.log(sess.dates);
        sess.result.forEach(function(item){
            item.date = new Date(item.date);
        })
        res.render('dates',{data: sess.result,crypto:sess.crypto,max:sess.dates,agg:sess.aggregation});
    }else{
    MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cryptocurrencies");
        // console.log(sess.crypto);
        dbo.collection(sess.crypto).findOne({"title":sess.monthtitle},function(err, result) {
            if (err) throw err;
            // console.log(result);
            datesArr = [];
            result.dates.forEach(function(item){
                datesArr.push(item);
            })
            sess.result = datesArr;
            console.log(sess.result);
            res.render('dates',{data: sess.result,crypto:sess.crypto,max:sess.dates,agg:sess.aggregation});
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
    console.log(req.body.aggre);
    if(sess.aggregation == 'max'){
  
    var col = '$dates.'+req.body.column;
    console.log(col);
    MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cryptocurrencies");
    dbo.collection('bitcoin').aggregate([
    {$match:{'title':'2017/01'}},
    {$unwind:'$dates'},
    {$group:{_id:null,max:{$max:col}}},
    {$project:{max:1,_id:0}}
  
  ]).toArray(function(err,arrRes){
    // console.log(arrRes);
    sess.dates= arrRes;
    res.end('done');
  });
  });
  }else if(sess.aggregation == 'min'){
  
  var col = '$dates.'+req.body.column;
  console.log(col);
  MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cryptocurrencies");
  dbo.collection('bitcoin').aggregate([
  {$match:{'title':'2017/01'}},
  {$unwind:'$dates'},
  {$group:{_id:null,min:{$min:col}}},
  {$project:{min:1,_id:0}}
  
  ]).toArray(function(err,arrRes){
  // console.log(arrRes);
  sess.dates= arrRes;
  res.end('done');
  });
  });
  } else {
  
  var col = '$dates.'+req.body.column;
  console.log(col);
  MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cryptocurrencies");
  dbo.collection('bitcoin').aggregate([
  {$match:{'title':'2017/01'}},
  {$unwind:'$dates'},
  {$group:{_id:null,avg:{$avg:col}}},
  {$project:{avg:1,_id:0}}
  
  ]).toArray(function(err,arrRes){
  // console.log(arrRes);
  sess.dates= arrRes;
  res.end('done');
  });
  });
  }
  })
  


// app.listen(PORT,function(){
//   console.log("now listening to ${ PORT}");
// });

app.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

});
