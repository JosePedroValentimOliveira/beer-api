const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const bcrypt = require('bcryptjs')


const Beer = require('../models/BierModel');
const User = require('../models/UserModel');
const Stock = require('../models/StockModel');


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
    Beer.find().then((beers)=>{res.send(beers)});
})

router.get('/stock',(req,res)=>{
    const beers = [];
    Stock.find().then(async(stocks)=>{
        
        for (const stock in stocks) {
            const data = await Beer.findById({_id:stocks[stock].beer_id});
            var obj = JSON.stringify(data);
            obj = `${obj.substring(0,obj.length-1)},"stock":${stocks[stock].quantity}${obj.substring(obj.length-1,obj.length)}`;
            obj = JSON.parse(obj);
            beers.push(obj);
        }
        res.json(beers)
    });

    
})
/* router.get('/deleteBeer/:beerId',(req,res)=>{
    const {beerId} = req.params;
    Beer.findOneAndDelete({beer_id:beerId}).exec();
    
}) */
router.get('/updateStock/:beerId/:quantity',(req,res)=>{
    const{beerId,quantity} = req.params;
    if(quantity <= 0){
        Stock.deleteOne({beer_id:beerId}).exec();
        res.json("Stock was 0, verwijderd uit stock!")
    }
    else
    {Stock.update({beer_id:beerId},{$set: {quantity: quantity} }).exec();
            res.json("Bijgewerkt!");}
})
//moet waarschijnlijk post worden voor aanpassen ofzo 

router.get('/dranken-lijst/:beer',(req,res)=>{
    Beer.find({beer_name:req.params.beer}).then((beers)=>{res.json(beers)});
})
router.post("/saveUser",(req,res)=>{
    const {username,password} = req.body

    User.findOne({username:username}).then((user)=>{
        if(user){
            res.send(JSON.stringify('username in gebruik'));
        }
        else{
            const newUser = new User({username:username,password:password,stock:{}});

            bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;

                newUser.password = hash;
                newUser.save().then().catch(err=>console.log(err))
            }))      
        }
    })
})
router.post("/login",(req,res)=>{
    const {username,password} = req.body
  
        
    User.findOne({username:username}).then((user)=>{

        if(user){
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(isMatch){
                    res.send(user._id);
                }
                else {res.send(err)}
            })
        }
        else{
            res.send(false);
        }
        


       
    })
})

router.get('/new_beer',(req,res)=>{
    res.render('new_beer');
})

router.get('/getImages', async(req,res)=>{
    const {beer_name} = req.query;
    console.log(beer_name);
    const imagesArray = await fetchGoogleImageLinks(`${beer_name} fles met glas`);
    res.json(imagesArray);
})
router.post('/editBeer',async(req,res)=>{
    const {beer_id,beer_name,beer_percentage,beer_type,beer_img} = req.body;

    const object = {
        beer_name,beer_img,beer_type,beer_percentage
    };
    const response = await Beer.update({_id:beer_id},{$set:object}).exec();
    if (response != null){
        res.json(JSON.stringify(true))
    }
    else{
        res.json(JSON.stringify(false));
    }
    
})
router.post('/saveBeer',(req,res)=>{
    const {beer_name,beer_img,beer_type,beer_percentage} = req.body;
    
    
    Beer.findOne({beer_name,beer_percentage}).then((beer)=>{
        if(beer){
            // Zet hier dat da een error mee geeft met de render
            // Kijk naar it project users. voor da door te sturen en register view
            console.log('bier bestaat al');
            res.json(JSON.stringify(true))
        }
        else{
        
            const newBeer = new Beer({
                beer_name,beer_img,beer_type,beer_percentage
            });

             newBeer.save().then(beer=>{
                 console.log(`${beer.beer_name} is opgeslagen`)
                 res.json(JSON.stringify(false))
             }).catch(err=>{console.log(err)})

             //Voor de error hetzelfde doen als met bestaat al. Zodat de gebruiker weet dat er iets mis is gegaan. dus stuur alles terug;
        }
    }).catch();
   
})

router.post('/stock',async(req,res)=>{
    const {beer_id,quantity} = req.body;

    Stock.findOne({beer_id:beer_id}).then((found)=>{
        console.log(found);
        if(found){
            let value = found.quantity + parseInt(quantity);
            Stock.update({beer_id:beer_id},{$set: {quantity: value} }).exec();
            res.json("Bijgewerkt!");
        }   
        else{
            const newStock = new Stock({beer_id:beer_id,quantity:quantity});
            newStock.save().then(result=>{
                if(result){
                    res.json(JSON.stringify(true));
                }
                else{
                    res.json(JSON.stringify(false));
                }
            });
            
        }
    });
    
})


module.exports = router;