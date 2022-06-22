var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require("body-parser");
app.use(cors())
const port = 3000;
const formidable = require('formidable');
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
// let url = "mongodb://username:password@localhost:27017/";
let url ="mongodb+srv://amani:amaniamani@cluster0.yu4sd.mongodb.net/?retryWrites=true&w=majority";
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads/mentors'
});
const multipartMiddleware1 = multipart({
  uploadDir: './uploads/newjoiners'
});

app.post('/mentors', multipartMiddleware, (req, res) => {
  csvtojson()
  .fromFile(req.files.file.path)
  .then(csvData => {
    console.log(csvData);
    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;
        client
          .db("users")
          .collection("mentors")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;
            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  }); 
});
app.post('/newjoiners', multipartMiddleware1, (req, res) => {
  csvtojson()
  .fromFile(req.files.file.path)
  .then(csvData => {
    console.log(csvData);
    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;
        client
          .db("users")
          .collection("newjoiners")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;
            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  }); 
});
app.get('/mentors', function(req, res) {
  const dburl = 'mongodb+srv://amani:amaniamani@cluster0.yu4sd.mongodb.net/?retryWrites=true&w=majority';
  const dbname = 'users';
  const collname = 'mentors';
  // connect to DB
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
    // Get db
      const db = client.db(dbname);
   
      // Get collection
      const collection = db.collection(collname);
     
      // Find all documents in the collection
      collection.find({}).toArray(function(err, todos) {
        if (!err) {
        
          console.log(todos); 
          return res.status(200).send(todos);
        }
      }); 
     
    }
  });
});
app.get('/newjoiners', function(req, res) {
  const dburl = 'mongodb+srv://amani:amaniamani@cluster0.yu4sd.mongodb.net/?retryWrites=true&w=majority';
  const dbname = 'users';
  const collname = 'newjoiners';
  // connect to DB
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
        
  
      // Get db
      const db = client.db(dbname);
  
      // Get collection
      const collection = db.collection(collname);
      
      // Find all documents in the collection
      collection.find({}).toArray(function(err, newjoiners) {
        if (!err) {
          return res.status(200).send(newjoiners);
        }
      }); 
     
    }
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

