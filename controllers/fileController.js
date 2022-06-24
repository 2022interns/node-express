
const mongodb = require("mongodb").MongoClient;
var request = require('request');
var MongoClient = require('mongodb').MongoClient;
const csvtojson = require("csvtojson");
let url ="mongodb+srv://amani:amaniamani@cluster0.yu4sd.mongodb.net/?retryWrites=true&w=majority";

exports.getmentorsfile= async (req,res)=>{
    try{
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
        console.log(req.files.file.path);
    }
    catch(err){
        console.error(err)
    }
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
