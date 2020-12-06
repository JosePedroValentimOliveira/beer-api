const express = require('express');
const app = express();

require('dotenv').config();

require('./config/db');

const Beer = require('./models/BeerModel');





//server

app.set('port',process.env.PORT || 3000);



app.get("/", (req, res) => {
    Beer.find().then((beers)=>{res.json(beers)})
});


//pagina 404
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//pagine 500 (= interne serverfout)
app.use(function(req,res){
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
});

