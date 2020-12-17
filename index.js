var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb');
var port = (process.env.PORT || 3000);
var BASE_API_PATH = "/api/v1";
var DB_FILE_NAME = __dirname + "/clients.json";


console.log("Starting API server...");

var app = express();

app.use(bodyParser.json());

var db=new DataStore({
    filename: DB_FILE_NAME,
    autoload: true
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>My clients server</h1></body></html>");
});

app.get(BASE_API_PATH + "/clients", (req, res) => {
    console.log(Date() + " - GET /clients");
    db.find({}, (err,clients)=> {
        if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        }else{
            res.send(clients.map((contact)=>{
                delete clients._id;
                return contact;
            } ));
        }

    });
});

app.post(BASE_API_PATH + "/clients", (req, res) => {
    console.log(Date() + " - POST /clients");
    var contact = req.body;
    db.insert(contact, (err)=>{
        if(err){
            console.log(Date()+ " - "+ err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    });
});

app.put(BASE_API_PATH + "/clients/:id", (req, res) => {
    console.log(Date() + " - PUT /clients");
    var contact = req.body;
    //Arreglar el .update para que coja bien el _id en formato JSON
    db.update({
        _id: parseInt(req.id)
      }, req.body, {}, function (
        err
      ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
      } );
    });

app.listen(port);

console.log("Server ready!");
