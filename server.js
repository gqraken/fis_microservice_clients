var express = require('express');
var bodyParser = require('body-parser');
const Client = require('./clients');

var BASE_API_PATH = "/api/v1";

var app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>My clients server</h1></body></html>");
});

app.get(BASE_API_PATH + "/clients", (req, res) => {
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

app.post(BASE_API_PATH + "/clients", (req, res) => {
    console.log(Date() + " - POST /clients");
    var client = req.body;
    Client.create(client, (err)=>{
        if(err){
            console.log(Date()+ " - "+ err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    });
});

app.put(BASE_API_PATH + "/clients/:nif",(req,res)=>{
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

app.delete(BASE_API_PATH +"/clients/:nif", async (req, res) => {
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
    
module.exports=app;
