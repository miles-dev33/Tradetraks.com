
    //   //adding users
    //   var passport = require('passport')
    //   , LocalStrategy = require('passport-local').Strategy;
      
  
    //   app.configure(function() {
    //       app.use(express.static('public'));
    //       app.use(express.cookieParser());
    //       app.use(express.bodyParser());
    //       app.use(express.session({ secret: 'keyboard cat' }));
    //       app.use(passport.initialize());
    //       app.use(passport.session());
    //       app.use(app.router);
    //     });
  
    //     var session = require("express-session"),
    //     bodyParser = require("body-parser");
    //        app.use(express.static("public"));
    //        app.use(session({ secret: "cats" }));
    //        app.use(bodyParser.urlencoded({ extended: false }));
    //        app.use(passport.initialize());
    //        app.use(passport.session());
  
  
    //   passport.use(new LocalStrategy(
    //   function(username, password, done) {
    //     User.findOne({ username: username }, function(err, user) {
    //       if (err) { return done(err); }
    //       if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //       }
    //       if (!user.validPassword(password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //       }
    //       return done(null, user);
    //     });
    //   }
    //   ));

    // app.post('/login',
    // passport.authenticate('local', { successRedirect: '/',
    //                                  failureRedirect: '/home.tml',
    //                                  failureFlash: true })
    // );
   
      
    //   passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
    //   passport.authenticate('local', { successFlash: 'Welcome!' });
  

    var LocalStrategy   = require('passport-local').Strategy,
    async = require('async');
  
  // Create a list of users just for demo.
  // In reality, you will probably query a database
  // to fetch this user
  var users = {
    'one@example.com': {
      id: 'userOne',
      password: 'one',
      email: 'one@example.com'
    },
    'two@example.com': {
      id: 'userTwo',
      password: 'two',
      email: 'one@example.com'
    }
  };
  
  function createAccount (newUser, callback) {
      // Call API to create account
      users[newUser.email] = newUser;
      callback(null, newUser);
  }
  
  // Invokes callback with a non-empty object if email already exists, null otherwise
  function findExistingEmail (email, callback) {
      // Call API to check if the email already exists
      if(users[email]) {
        callback({err: 'Email Already Exists'});
      } else {
        callback(null, null);
      }
  }
  
  module.exports = function (passport) {
  
    passport.serializeUser(function(user, done) {
      done(null, user.email); // This is what passport will save in the session/cookie
    });
  
    passport.deserializeUser(function(email, done) {
      // Use the email saved in the session earlier
      // to fetch the actual user
      var user = users[email];
      done(null, user);
    });
  
    // We name our strategy 'local-login'.
    // You can use any name you wish
    // This is the name you will refer to later in a route
    // that handles the login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
      if(users[email] && users[email].password === password) {
        return done(null, users[email]);
      } else {
        done(null, false, req.flash('message', 'Invalid email or password'));
      }
    }));
  
    passport.use('local-signup',
      new LocalStrategy({
        usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true // Pass back the entire request to the callback
        }, function (req, email, password, done) {
  
          process.nextTick(function() {
  
            async.auto({
              doesEmailAlreadyExist: function (cb, results) {
                findExistingEmail(email, cb);
              },
              newAccount: ['doesEmailAlreadyExist',
                function (cb, results) {
  
                  var newUser = {
                    email: email,
                    password: password
                  };
                  createAccount(newUser, cb);
                }
              ]
            }, function (err, results) {
              if (err) {
                done(null, false, req.flash('signupMessage', err.message));
              } else {
                done(null, results.newAccount);
              }
            });
  
          });
      })
    );
  
  };
  






var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");

var mongoose = require("mongoose");

var mongoRef = require("./mongo.js")

//var mongo = new mongoRef("mongodb://Stephen:123456@ds141514.mlab.com:41514/tradetrakstest");

var mongo = new mongoRef("mongodb://milesawayj:Tradetraks666$@ds141524.mlab.com:41524/tradetraks");

  
//AND THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
global.fetch = require('node-fetch')
const cc = require('cryptocompare')

//THIS BRINGS IN THE DATA FROM CRYPTOCOMPARES FETCH API SUPER IMPORTANT AND STORES AS OBJECTS
//*************************************************************************
/*      Okay guys you should know that when you uncomment this, live data 
        will be being request every 5 seconds it is set to 5000 milliseconds
        and we must make sure to
         ***************************************************************
         *
         * NOT ALL BEING MAKING API REQUESTS AT THE SAME TIME
         * WE CAN ONLY DO 4000 IN HOUR SO WE MUST KEEP THE CALLS SIMPLE FOR TESTING FOR NOW
         *
         * *************************************************************
********************************************************************************/
// setInterval(function() {
//         // Passing a single pair of currencies:
//         cc.price('BTC', 'USD')
//         .then(prices => {
//         console.log(prices)
//         // -> { USD: 1100.24 }
//         })
//         .catch(console.error)
// },1000);

// setInterval(function() 
// {
//     // Passing a single pair of currencies:
//     cc.price('BTC', 'USD')
//     .then(prices => {

//     mongo.Insert("BTC-USD", prices).then(result =>
//     {
//         result;
//     })
//     // console.log(prices)
//     // -> { USD: 1100.24 }
//     })
//     .catch(console.error)
// },20000);



// setInterval(function()
// {
//     cc.priceFull(['BTC', 'ETH'], ['USD', 'EUR'], ["USD","ETH"], ["USD", "BTC"])
//     .then(prices => {
//       console.log(prices)
//     })
//     .catch(console.error)
// }, 10000)






//  MIUNTES - DATA FROM CRYPTOCOMPARES FETCH API SUPER IMPORTANT AND STORES AS OBJECTS
//*************************************************************************
/*      Okay guys you should know that when you uncomment this, live data 
        will be being request everytime, and it brings back over 1,341
        items, I don't know if its with one request or not so be careful
         ***************************************************************
         *
         * NOT ALL BEING MAKING API REQUESTS AT THE SAME TIME
         * WE CAN ONLY DO 4000 IN HOUR SO WE MUST KEEP THE CALLS SIMPLE FOR TESTING FOR NOW
         * 
         * 
         *
         * *************************************************************
********************************************************************************/
// setInterval(function()
// {
//     cc.histoMinute('BTC', 'USD')
//     .then(data => {
//       console.log(data)
//       // -> [ { time: 1487970960,
//       //        close: 1171.97,
//       //        high: 1172.72,
//       //        low: 1171.97,
//       //        open: 1172.37,
//       //        volumefrom: 25.06,
//       //        volumeto: 29324.12 },
//       //        ... ]
//     })
//     .catch(console.error)
// }, 60000)









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



// app.get("/login", function(req, res)
// {

//     res.sendFile(path.join(__dirname, "home.html"));

// });







app.use(express.static(path.join(__dirname, '/public')));



app.get("/currentprices", function(req, res) 

{

    res.sendFile(path.join(__dirname, "./public/apidata/streamer/current/prices.html"));

});







// Starts the server to begin listening

// =============================================================

app.listen(PORT, function()

{

   console.log("App listening on PORT " + PORT);

});
