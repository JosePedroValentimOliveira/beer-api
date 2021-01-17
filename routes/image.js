const express = require('express');
const router = express.Router();
const imgUrl = require('')
const fs = require('fs');
router.get('test',(req,res)=>{
    res.set('Content-Type','image/jpg');

    const img = fs.readFileSync('~/images/minion.jpg');
    res.send(img)
})
module.exports = router;