const axios = require("axios");
const xml2js = require("xml2js");
const util = require("util"); //dev only
const builder = require("./builder.js");
const express = require("express");
const app = express();

const parser = new xml2js.Parser();

//var xmls = "<smeterengine>\n <scale>DAY</scale>\n <city>BERLIN</city>\n <district>\n <time_period begin=\"2013-06-12 15:40:00\" end=\"2013-06-12 17:00:00\" time_zone='CET'/>\n</district>\n</smeterengine> ";
//var xmls = "<smeterengine> <scale>DAY</scale> <city>BERLIN</city> <district> <time_period begin=\"2013-06-12 15:40:00\" end=\"2013-06-12 17:00:00\" time_zone='CET'/></district></smeterengine> ";

var xmls = builder.prepareOptions("DAY", "BERLIN", "Pankow", "2013-06-12 15:40:00", "2013-06-12 17:00:00");

axios.post('https://www.vattenfall.de/SmeterEngine/networkcontrol',
           xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(res => {
             parser.parseString(res.data, function (err, result) {
              console.log(util.inspect(result, false, null));
              console.log("done");
             });
           }).catch(err=>{console.log(err)
});