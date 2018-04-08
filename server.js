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

var now = new Date();
var oneDayAgo = new Date(now.getTime() -60000*60*1);
var twoDaysAgo = new Date(now.getTime() -60000*60*24);
var beginDate = builder.buildDateString(twoDaysAgo);
var endDate = builder.buildDateString(oneDayAgo);

var xmls; 


app.get("/", function(req,res) {
  res.sendFile(process.cwd() + "/index.html");
});


app.post("/api", function (req, res) {
  console.dir("posting")
  xmls = builder.prepareOptions(req.body.scale, "BERLIN", req.body.district, "2017-06-12 15:40:00", "2017-06-12 17:00:00");

  res.redirect("/startApi");

})

app.get("/startApi", function(req, res) {

xmls = builder.prepareOptions("DAY", "BERLIN", "BERLIN", beginDate, endDate);

var stromnetz = {};

axios.post('https://www.vattenfall.de/SmeterEngine/networkcontrol',
           xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           
           }).then(response => {
             parser.parseString(response.data, function (err, result) {
             var newest = result.smeterengine.district["0"].period["0"].districtTimestampData.length;

             //determine district
             if (!result.smeterengine.district["0"].$.name) {
                stromnetz.district = "Berlin";} 
            else {
                stromnetz.district = result.smeterengine.district["0"].$.name;
                  } 

              console.log("District is " + stromnetz.district)

              stromnetz.slices = result.smeterengine.district["0"].period["0"].districtTimestampData;
              stromnetz.maxGen = result.smeterengine.district["0"].$.maxGeneration;
              stromnetz.maxUse = result.smeterengine.district["0"].$.maxUsage;
              stromnetz.timeToShow = result.smeterengine.district["0"].period["0"].districtTimestampData[newest-1].$.value.split("T")[0];

    

              res.json(stromnetz);
              
             });
           }).catch(err=>{console.log(err)
});

});



app.listen(3000, () => {console.log("listening on port 3000")})