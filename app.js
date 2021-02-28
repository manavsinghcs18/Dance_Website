const express = require("express");
const path = require("path");
const app = express();
const mongoose =require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;



// Define mongoose schema 
const contactSchema = new mongoose.Schema({
    name : String,
    phone_no : String,
    email : String,
    address : String,
    desc : String
  });

const contact = mongoose.model('Contact', contactSchema);



// Express specefic stuff
app.use('/static',express.static('static'))     // For serving static files
app.use(express.urlencoded())

// Pug specefic stuff
app.set('view engine', 'pug')       //Set the template engine as a pug
app.set('views', path.join(__dirname,'views'))      //set the views directory

// Endpoints
app.get('/',(req, res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req, res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})
// npm install body-parser
app.post('/contact',(req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not sved to the database")
    });

    // res.status(200).render('contact.pug');
})

// Start the server
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}.`);
});