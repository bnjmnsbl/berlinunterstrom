const axios = require("axios");
const xml2js = require("xml2js");
const util = require("util"); //dev only

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const parser = new xml2js.Parser();
const builder = require("./builder.js");


app.use("/", express.static(process.cwd()));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


// dates not active yet
var now = new Date();
var endDate = builder.buildDateString(now);
var oneHourAgo = new Date(now.getTime() -60000*60);
var beginDate = builder.buildDateString(oneHourAgo);
//*******

var xmls = builder.prepareOptions("DAY", "BERLIN", "BERLIN", "2013-06-12 15:40:00", "2013-06-12 17:00:00");




app.get("/", function(req,res) {
  res.sendFile(process.cwd() + "/index.html");
});


app.post("/api", function (req, res) {
  
  xmls = builder.prepareOptions(req.body.scale, "BERLIN", req.body.district, "2017-06-12 15:40:00", "2017-06-12 17:00:00");

  res.redirect("/");

})

app.get("/startApi", function(req, res) {

var jsonObj = {};

axios.post('https://www.vattenfall.de/SmeterEngine/networkcontrol',
           xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(response => {
             parser.parseString(response.data, function (err, result) {
             jsonObj = JSON.stringify(result)
             
              res.json(result);
              
             });
           }).catch(err=>{console.log(err)
});

});



app.listen(3000, () => {console.log("listening on port 3000")})