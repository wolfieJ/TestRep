/**
 * Created by Balachandran on 3/28/2016.
 */

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactsDB', ['contactslist']);
var parser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(parser.json());

app.get('/contactlist', function (req, res) {
    console.log("Server received a GET request");

    db.contactslist.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function (req, res) {
    console.log(req.body);
    db.contactslist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactslist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
       res.json(doc);
    });
});


app.listen(3000);
console.log("Server running on port 3000");
