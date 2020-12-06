const express = require('express');
const router = express.Router();

const Beer = require('../models/BeerModel');


router.get('/getAllBeers',async(req,res)=>{
   let beersJson = await Beer.find().then((beers)=>{return beers;}).catch();
   res.json(beersJson);
    
})



module.exports = router;
