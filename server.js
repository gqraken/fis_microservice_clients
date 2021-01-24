var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const Client = require('./clients');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authValidation = require('./auth');
const {loginValidation, registerValidation} = require('./validations');

const TOKEN = (process.env.TOKEN_SECRET || "fdgdfgdfgdfglkñjewlklekjwrljlkjsadlfkniu023984093840293lkhjkldf");

var BASE_API_PATH = "/api/v1";

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>My clients server</h1></body></html>");
});

app.get(process.env.VERSION + "/clients", (req, res) => {
    console.log(Date() + " - GET /clients");
    Client.find({}, (err,clients)=> {
        if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        }else{
            res.send(clients.map((contact)=>{
                return contact.cleanup();
            } ));
        }

    });
});

app.put(process.env.VERSION + "/clients/:nif",(req,res)=>{
  console.log(Date() + " - PUT /clients/" + req.params.id);
  Client.updateOne({nif: req.params.nif}, {$set:{  
    name: req.body.name,
    address: req.body.address,
    mail: req.body.mail,
    phone: req.body.phone}}, {multi: true}, (err)  => {
    if (err) {
        console.log(Date() + " - " + err);
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
        console.log("Client data has been updated")
    }
  });
});

app.delete(process.env.VERSION +"/clients/:nif", async (req, res) => {
  console.log(req.params.nif);
  Client.remove({
    nif : req.params.nif
  }, function(err) {
    if (err)
      res.send(err);
    else
      res.send('Success! Client has been deleted.');	
    });
  });

app.post(process.env.VERSION + '/register', async (req, res) => {
    // Validating data

    const client = await Client.findOne({ username : req.body.username });
    if(client) return res.status(400).send('There is a client with the same username');

    const validation = registerValidation(req.body);

    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newClient = new Client({
        username: req.body.username, 
        password: hashedPassword, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        phone: req.body.phone, 
        address: req.body.address
    });

    newClient.save()
    .then((savedClient) => res.json(savedClient))
    .catch(err => res.status(400).json('Error registering: ' + err));
    return res;
});

app.post(process.env.VERSION + '/login', async (req, res) => {
    // Validating data
    const validation = loginValidation(req.body);

    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    // Check if username exists
    const client = await Client.findOne({ username : req.body.username });
    if(!client) return res.status(400).send('Client does not exist');
    // Check for password
    const validPassword = await bcrypt.compare(req.body.password, client.password);
    if(!validPassword) return res.status(400).send('Password is wrong');

    // Create and assign a token
    const token = jwt.sign({_id: client.id}, TOKEN, {expiresIn: '1d'});
    res.header('auth-token', token).send({
            token: token,
            id: client.id
    });
    return res;
});

module.exports=app;
