const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

require('./config/db');
const Beer = require('./models/BeerModel');


//app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));



app.use(express.json());

app.get('/',(req,res)=>{
    Beer.find({}).then((beers)=>{
        res.json(beers);
    })
})

app.get('/getAllBeers',(req,res)=>{
    Beer.find({}).then((beers)=>{
        res.json(beers);
    })
})

app.post('/saveBeer',(req,res)=>{
    const {beer_name,beer_percentage,beer_type,beer_img} = req.body;
})

app.listen(PORT,()=>{console.log(`backend up on port: ${PORT}`)})

