var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");

var mongoose = require("mongoose");



global.fetch = require('node-fetch')
const cc = require('cryptocompare')



// // // Basic Usage:
// // cc.price('BTC', ['USD', 'EUR'])
// // .then(prices => {
// //  console.log(prices)
// //  // -> { USD: 1100.24, EUR: 1039.63 }
// // })
// // .catch(console.error)


setInterval(function() {
        // Passing a single pair of currencies:
        cc.price('BTC', 'USD')
        .then(prices => {
        console.log(prices)
        // -> { USD: 1100.24 }
        })
        .catch(console.error)
},5000);





//setInterval(function()
//{
    // cc.histoMinute('BTC', 'USD')
    // .then(data => {
    //   console.log(data)
    //   // -> [ { time: 1487970960,
    //   //        close: 1171.97,
    //   //        high: 1172.72,
    //   //        low: 1171.97,
    //   //        open: 1172.37,
    //   //        volumefrom: 25.06,
    //   //        volumeto: 29324.12 },
    //   //        ... ]
    // })
    // .catch(console.error)
//}, 10000)








// Sets up the Express App

// =============================================================
//Creates the web app that is going to be served
var app = express();
//declars the port- NOTE - This is to be changed to the port number that our hosting server uses after we are done testing all of our sites features.
var PORT = 8080;
//These to lines connect to the database this is the port number of our mongoDB
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/tradetraks");

// var promise = mongoose.createConnection('mongodb://localhost/tradetraks', 
// {
//     useMongoClient: true
// });

//creates a schema that shows how the data will be formatted in the DB values are just for testing
// var nameSchema = new mongoose.Schema(
// {
//     firstName: String,
//     lastNameName: String
// });

// var User = mongoose.model("User", nameSchema);


// // Sets up the Express app to handle data parsing

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.text());

app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// app.post("/addname", (req, res) => 
// {
//     var myData = new User(req.body);
//     console.log("User req.body: " + myData)
//     myData.save()
//     .then(item => 
//     {
//         res.send("item saved to database");
//         console.log("Item: " + item)
//     })
//     .catch(err => 
//     {
//         res.status(400).send("unable to save to database");
//     });
// });

app.get("/", function(req, res)
{

    res.sendFile(path.join(__dirname, "home.html"));

});


app.use(express.static(path.join(__dirname, '/public')));

app.get("/currentprices", function(req, res) 

{

    res.sendFile(path.join(__dirname, "public/apidata/streamer/current/prices.html"));

});


// Starts the server to begin listening

// =============================================================

app.listen(PORT, function()

{

   console.log("App listening on PORT " + PORT);

});
