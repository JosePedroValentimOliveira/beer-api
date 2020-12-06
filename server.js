const express = require('express');
const app = express();


require('./config/db')







app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));





app.use('/dashboard',require('./routes/dashboard'));




app.get('/', (req, res) => {
  res.send("welcome op de homepage: Work in progres")

  
});



app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
  });