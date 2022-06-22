
const mongodb = require("mongodb").MongoClient;
var request = require('request');
var MongoClient = require('mongodb').MongoClient;

/* 
//kifech kenet fel app.js //
app.post('/mentors', multipartMiddleware, (req, res) => {
    console.log(req.files.file)
});*/
//nheb nda5el multipartMiddleware fel fonction ??? // 


exports.getmentorsfile= async (req,res)=>{
console.log(req.files.file)

    }; 



exports.readmentors = async (req,res) => {
        const dburl = 'mongodb+srv://amani:amaniamani@cluster0.yu4sd.mongodb.net/?retryWrites=true&w=majority';
        const dbname = 'users';
        const collname = 'mentors';
        MongoClient.connect(dburl, function(err, client) {
          if (!err) {
            const db = client.db(dbname);
            const collection = db.collection(collname);
            collection.find({}).toArray(function(err, todos) {
              if (!err) {
                console.log(todos); 
                return res.status(200).send(todos);
              }
            }); 
          }
        });
      };
 exports.readnewjoiners = async (req,res) => {
        const dburl = 'mongodb+srv://amani:amaniamani@cluster0.yu4sd.mongodb.net/?retryWrites=true&w=majority';
        const dbname = 'users';
        const collname = 'newjoiners';
        MongoClient.connect(dburl, function(err, client) {
          if (!err) {
            const db = client.db(dbname);
            const collection = db.collection(collname);
            collection.find({}).toArray(function(err, todos) {
              if (!err) {
                console.log(todos); 
                return res.status(200).send(todos);
              }
            }); 
          }
        });
      };