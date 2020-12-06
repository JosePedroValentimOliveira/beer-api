const express = require('express');
const router = express.Router();

const Beer = require('../models/BeerModel');


router.get('/getAllBeers',(req,res)=>{
    Beer.find().then((beers)=>{
        res.json(beers);
    }).catch();
})



module.exports = router;