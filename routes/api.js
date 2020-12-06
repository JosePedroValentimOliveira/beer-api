const express = require('express');
const router = express.Router();

const Beer = require('../models/BeerModel');


router.get('/getAllBeers',(req,res)=>{
   let beersJson = await Beer.find().catch();
   res.json(beersJson);
    
})



module.exports = router;
