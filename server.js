const express = require('express');
const app = express();

require('dotenv').config();


require('./config/db');



//server

app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use('/api',require('./routes/api'));

app.get('/',(req,res)=>{
    res.json({text:"hallo"});
})





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

