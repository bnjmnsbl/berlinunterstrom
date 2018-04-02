const axios = require("axios");
const xml2js = require("xml2js");
const util = require("util"); //dev only

const express = require("express");
const app = express();

const parser = new xml2js.Parser();
const builder = require("./builder.js");


var xmls = builder.prepareOptions("DAY", "BERLIN", "Pankow", "2013-06-12 15:40:00", "2013-06-12 17:00:00");

app.get("/", function(req,res) {
  res.sendFile("./index.html");
});

/*
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

*/

app.listen(8080, () => {console.log("listening on port 8080")})