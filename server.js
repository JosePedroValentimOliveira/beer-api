var express = require("express");
var bodyParser = require("body-parser");
var app = express();

require('./config/db');
const Beer = require('./models/BeerModel');





var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.

app.use('/',async (req,res)=>{
    const beers = await Beer.find().catch();
    res.send(beers);
})

// Connect to the database before starting the application server.

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  })

// CONTACTS API ROUTES BELOW