const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
//const expressLayouts = require('express-ejs-layouts');

require('./config/db')







app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Express Session
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized :true
}));


app.use('/dashboard',require('./routes/dashboard'));




app.get('/', (req, res) => {
  res.send("welcome op de homepage: Work in progres")

  
});



app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
  });