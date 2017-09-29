





var Mongo = function(url)
{
    var MongoClient = require('mongodb').MongoClient;
    var http = require("http");
    this.url = url;
    
    
    this.CreateDb = function()
    {
        return new Promise(function(res, rej)
        {
            MongoClient.connect(url, function(err, db) 
            {
                if (err) throw err;
                console.log("Database created!");
            });
        })
    }


    
    // this.CreateCollection() = function(CollectionName)
    // {
    //     return new Promise(res,err =>
    //     {
    //         MongoClient.connect(this.url, function(err, db) 
    //         {
    //             db.createCollection(CollectionName, function(err, res) 
    //             {
    //                 if (err) throw err;
    //                 console.log("Collection created!");
    //             });
    //         })
    //     })
        
    // }    

    this.Insert = function(collectionName, dataObject)
    {
        return new Promise(function(res, rej)
        {
            MongoClient.connect(url, function(err, db) 
            {
                if (err) throw err;
                db.collection(collectionName).insertOne(dataObject, function(err, res)
                {
                    if (err) reject(err);
                    console.log("1 document inserted");
                });
            })
        })      
    } 

    
    
    this.ReturnAll = function(collectionName)
    {
        return new Promise(function(res, rej)
        {
            MongoClient.connect(this.url, function(err, db) 
            {
                if (err) reject(err);
                db.collection(collectionName).findOne({}, function(err, result) 
                {
                    if (err) reject(err);
                    resolve(result);
                });
            })
        })  
    }

    this.Query = function(collectionName, query)
    {
        return new Promise(function(res, rej)
        {
            MongoClient.connect(this.url, function(err, db) 
            {
                if (err) reject(err);
                db.collection("customers").find(query).toArray(function(err, result) 
                {
                  if (err) reject(err);
                  resolve(result);
                });
            })
        
        })
    }

    this.Delete = function(collectionName, query)
    {
        return new Promise(function(res, rej)
        {
            MongoClient.connect(this.url, function(err, db) 
            {
                if (err)  reject(err);
                db.collection(collectionName).deleteOne(query, function(err, obj) 
                {
                  if (err) reject(err);
                  console.log("1 document deleted");
                });
            });
        })
    }

    this.DropCollection = function(collection, name)
    {
        return new Promise(function(res, rej)
        {
            MongoClient.connect(this.url, function(err, db) 
            {
                if (err) reject(err);
                db.collection(collection).drop(function(err, delOK) 
                {
                    if (err) reject(err);
                    if (delOK) console.log("Collection deleted");
                });
            });
        })
    }

    this.Update = function(collection, query, newValues)
    {
        return new Promise(res,rej)
        {
            MongoClient.connect(this.url, function(err, db) 
            {
                if (err) reject(err);
                db.collection(collection).updateOne(query, newvalues, function(err, res) 
                {
                    if (err) reject(err);
                    console.log("1 document updated");
                });
              });
        }
    }
    
    //Join needs some work, very confusing for me 

    // this.Join = function(collection, fromObject, toObject)
    // {
    //     return new Promise(res, rej)
    //     {
    //         MongoClient.connect(this.url, function(err, db) 
    //         {
    //             if (err) reject(err);
    //             db.collection('orders').aggregate([
    //               { $lookup:
    //                  {
    //                    from: 'products',
    //                    localField: 'product_id',
    //                    foreignField: 'id',
    //                    as: 'orderdetails'
    //                  }
    //                }
    //               ], function(err, res) {
    //               if (err) throw err;
    //               resolve(res);
    //             });
    //           });
    //     }
    // }
} 

module.exports = Mongo;