const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//db start
require('./config/db')

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// routes
app.use('/api',require('./routes/api'));



// /routes
app.get('/', (req, res) => {
  res.send("welcome op de homepage: Work in progres")

  
});




app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
  });