var fs = require('fs');
// var parse = require('csv-parse');
var csv = require('fast-csv');
// let dateandtime = require('date-and-time');
// var asynch = require('asynch');
const mongoose = require('mongoose');
// var asynckit = require('async-kit');
// var Promise = require("promise");
// var Month = require('./months');
// var Date = require('./months');
// var exp = require('./months');
const Schema = mongoose.Schema;

const DateSchema = new Schema({
    date:
        //String
        Schema.Types.Date
    ,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
    marketcap: Number
});

const MonthSchema = new Schema({
    title: { type: String, required: true },
    dates: [DateSchema]

});

const CrDate = mongoose.model('date', DateSchema);

var db =mongoose.connect('mongodb://Kostas23:Corazon2393@ds153906.mlab.com:53906/testcrypto3', { useNewUrlParser: true }, function () {





    var arr = new Array();
    var arr2 = [];


    if (fs.existsSync('csvupdate.txt')) {

        fs.readFileSync('csvupdate.txt').toString().split('\n').forEach(function (line) { arr.push(line); })


        arr.forEach(function (index) {
            arr2.push(index.split(" ", 1));
        });
        arr2.splice(-1, 1);


        arr2.forEach(function (index) {
            console.log('crypto/' + index);

            createCollections(index);

        });
 





    } else {
        console.log("The file was deleted");

    }

    setTimeout(function(){
        mongoose.disconnect();
    },50000);
});




String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function capText(text) {
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

}

function createCollections(item) {

    var months = [];
    var csvData = [];

    // console.log(item.toString().includes("cash"));
    console.log(Object.prototype.toString.call(item));
    if (!(item.toString().includes("dataset"))) {
        // console.log(item.toString().replace("_price.csv", ""));
        var itemTitle = item.toString().replace("_price.csv", "");
        if (itemTitle.toString().includes('_')) {
            itemTitle = itemTitle.toString().replace('_', ' ');
        }
        var cappedTxt = capText(itemTitle);
        console.log(cappedTxt);


        // console.log(Object.prototype.toString.call(item));

        var monthsColl = { months: [] };
        var csvStream = csv()
            .on("data", function (data) {
                // console.log(itemTitle);
                // console.log(data);
                csvData.push(data);
                var monString;
                var dt = new Date(data[0].toString());
                dt.setDate(dt.getDate() - 1);
                var cmonth = (dt.getMonth() + 1).toString();
                if ((dt.getMonth() + 1).toString().length == 1) {
                    cmonth = "0" + cmonth.toString();
                }
                var cyear = (dt.getYear() + 1900).toString();

                // console.log(cmonth +" "+ cyear);
                monString = cyear + "/" + cmonth;
     
                var bmpDigits = /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0AE6\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]/;
                var hasNumber = RegExp.prototype.test.bind(bmpDigits);
                if (hasNumber(monString)) {

                    var includeMon = false;
                    monthsColl.months.forEach(function (monthitem) {

                        if (monthitem.monthtitle == monString) {
                            includeMon = true;
                        }
                    })
                    if (!includeMon) {
                        monthsColl.months.push({ monthtitle: monString, dates: [] });
                    }

                }
            }).on("end", function () {
                // console.log("---------------");
                // console.log(csvData);
                console.log('Creating collections');


                monthsColl.months.forEach(function (monthItem) {

                    csvData.forEach(function (dat) {

                        var dt = new Date(dat[0].toString());
                        dt.setDate(dt.getDate() - 1);
                        var cmonth = (dt.getMonth() + 1).toString();
                        if ((dt.getMonth() + 1).toString().length == 1) {
                            cmonth = "0" + cmonth.toString();
                        }
                        var cyear = (dt.getYear() + 1900).toString();

                        // console.log(cmonth +" "+ cyear);
                        clast = cyear + "/" + cmonth;
                        if (monthItem.monthtitle == clast) {
                            monthItem.dates.push({ date: dat[0], open: dat[1], high: dat[2], low: dat[3], close: dat[4], volume: dat[5], marketcap: dat[6] });
                        }
                    })
                })
                //Mongodb creating models

                var Month = mongoose.model('month', MonthSchema, cappedTxt);

                monthsColl.months.forEach(function (mon) {
                    // console.log(mon);

                    var month = new Month({
                        title: mon.monthtitle,
                        dates: []
                    });

                    month.save()

                        .then(function () {
                            Month.findOne({ title: mon.monthtitle }).then(function (record) {
                                mon.dates.forEach(function (dateItem) {
                                
                                    var dt = new Date(dateItem.date.toString());
                                    dt.setDate(dt.getDate() - 1);
                                    var cmonth = (dt.getMonth() + 1).toString();
                                    if ((dt.getMonth() + 1).toString().length == 1) {
                                        cmonth = "0" + cmonth.toString();
                                    }
                                    var cyear = dt.getYear() + 1900;

                                    var monString = cyear + "/" + cmonth;
                                    if (mon.monthtitle == monString) {
                                        var date = new CrDate({
                                            date: dateandtime.parse(dateItem.date, 'MMM DD, YYYY'),
                                            open: parseFloat(dateItem.open),
                                            high: parseFloat(dateItem.high),
                                            low: parseFloat(dateItem.low),
                                            close: parseFloat(dateItem.close),
                                            volume: parseInt(dateItem.volume.replace(/,/g, "")),
                                            marketcap: parseInt(dateItem.marketcap.replace(/,/g, ""))
                                        });
                                        // console.log(record);
                                        record.dates.push(date);

                                    }
                                })
                                record.save().then(function () {
                                    csvStream.resume();
                                });

                            });

                        });


                });

            });


        fs.createReadStream('crypto/' + item, { headers: false }).pipe(csvStream);

    }


}



