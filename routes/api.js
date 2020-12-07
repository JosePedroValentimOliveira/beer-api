const express = require('express');
const router = express.Router();
const google = require('googleapis').google;
const customSearch = google.customsearch('v1');


const Beer = require('../models/BierModel');



async function fetchGoogleImageLinks(query){
    const response =  await customSearch.cse.list({
        auth: process.env.Google_Api_Key,
        cx: process.env.Google_Search_Engine_Id,
        gl:"be",
        lr:"lang_nl",
        q: query,
        searchType:'image',
        fileType:"png",
        imgColorType:"trans",
        num:5
    })
  
    const imagesUrl = response.data.items.map((item)=>{
        return item.link;
    })
    return imagesUrl;
}

router.get('/',(req,res)=>{
    res.render('dashboard');
})
router.get('/dranken-lijst',(req,res)=>{
    Beer.find().then((beers)=>{res.json(beers)});
})

//moet waarschijnlijk post worden voor aanpassen ofzo 

router.get('/dranken-lijst/:beer',(req,res)=>{
    Beer.find({beer_name:req.params.beer}).then((beers)=>{res.json(beers)});
})
router.post("/saveUser",(req,res)=>{
    console.log(req.body);
})

router.get('/new_beer',(req,res)=>{
    res.render('new_beer');
})

router.get('/getImages', async(req,res)=>{
    const {beer_name} = req.query;
    const imagesArray = await fetchGoogleImageLinks(`${beer_name} fles`);
    res.json(imagesArray);
})

router.post('/saveBeer',(req,res)=>{
    const {beer_name,beer_percentage,beer_type,beer_img} = req.body;
    
    
    Beer.findOne({beer_name,beer_percentage}).then((beer)=>{
        if(beer){
            // Zet hier dat da een error mee geeft met de render
            // Kijk naar it project users. voor da door te sturen en register view
            console.log('bier bestaat al');
            res.redirect("/");
        }
        else{
            const newBeer = new Beer({
                beer_name,beer_img,beer_type,beer_percentage : `${beer_percentage}% `
            });

             newBeer.save().then(beer=>{
                 console.log(`${beer.beer_name} is opgeslagen`)
                 res.redirect('/dashboard');
             }).catch(err=>{console.log(err)})

             //Voor de error hetzelfde doen als met bestaat al. Zodat de gebruiker weet dat er iets mis is gegaan. dus stuur alles terug;
        }
    }).catch();
   
})


module.exports = router;