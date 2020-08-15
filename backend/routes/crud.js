
const DEFUALT_RESULT_COUNT_PER_PAGE = 15;
const DEFAULT_PAGE = 0;
var schema = require('../models/schema');

/**
 * 
 *  var clientCancelledRequest = 'clientCancelledRequest';

    function cancellableAPIMethodA(req, res, next) {
        var cancelRequest = false;

        req.on('close', function (err){
        cancelRequest = true;
        });

        var superLargeArray = [];

        try {
            // Long processing loop
            superLargeArray.forEach(function (item) {
                    if (cancelRequest) {
                        throw {type: clientCancelledRequest};
                    }
                    Work on item 
            });

            // Job done before client cancelled the request, send result to client
            res.send();
        } catch (e) {
            // Re-throw (or call next(e)) on non-cancellation exception
            if (e.type !== clientCancelledRequest) {
                throw e;
            }
        }
        // Job done before client cancelled the request, send result to client
        res.send();
    }
 */

module.exports = function(mongoose){

    return {
        fetch : async function(req, res) {
            var entity = req.params.entity
            var page = parseInt(req.params.page);
            var perPage = parseInt(req.params.perPage);
            console.log(page);
            console.log(perPage);
            if (!perPage){
                perPage  = DEFUALT_RESULT_COUNT_PER_PAGE;
            }
            
            if (!page){
                page  = DEFAULT_PAGE;
            }

            if (!schema.getEntityModel(entity)) {
                res.end(JSON.stringify({ result: 'no matched entity found'})); 
            }
        
            if(mongoose.connection.readyState == 1){
                try {
                    for await (const doc of schema.getEntityModel(entity).schemaModel.find()
                    .limit(perPage)
                    .skip(perPage * page)
                    .sort({
                        name: 'asc'
                    })) {
                        console.log(doc); // Prints documents one at a time
                        res.write(JSON.stringify(doc)); 
                    }
                    res.end();
                 } catch(e) {
                    console.log('Error:', e.message)
                    res.end(JSON.stringify({ result: []})); 
                 } 
               
            } else {
                res.end(JSON.stringify({ result: []})); 
            }
        },
        addEntity : async function(req, res) {
            var entity = req.params.entity
            var object = req.body.object
            var query = req.body.query;
            let result = "";

            console.log(req.body);
            console.log(object);
          
            if (!schema.getEntityModel(entity)) {
                res.end(JSON.stringify({ result: 'no matched entity found'})); 
            }
          
            var updateOrCreate = await new Promise( function( resolve, reject ) {
                var msg = ""
                try { 
                    schema.getEntityModel(entity).schemaModel.find(query).exec(async function(err, riders) {
                        if( riders !== undefined && riders !== null && riders.length>0){
                            msg = "user exists";
                            console.log("user exists");
                            console.log(riders);
                            resolve( {'msg' : msg } )
                        } else {
                            msg = "create new one";
                            console.log("create new one");
                            //create new one
                            var model = schema.getEntityModel(entity).schemaModel;
                            var rider = new model(object);
                            await rider.save();
                            resolve( {'msg' : msg })
                        }
                    });
                }
                catch(e) {
                    msg = e.message;
                    console.log('Error:', msg)
                    resolve( {'msg' : msg } )
                } 
            });
            result = updateOrCreate.msg;
            res.writeHead(200, {
                'Content-Type': 'appliation/json',
            });
            res.end(JSON.stringify({ result: result})); 
        },
        
        updateEntity : async function (req, res)  {
            var content = req.body.content;
            var entity = req.params.entity
            var object = req.body.object
            var set = req.body.setValues
            var uid = req.body.uid;
            var mobileNumber = req.body.mobileNumber;
            let result = ""
            var query = req.body.query;
            if (!schema.getEntityModel(entity)) {
                res.end(JSON.stringify({ result: 'no matched entity found'})); 
            }
            var updateOrCreate = await new Promise( function( resolve, reject ) {
                var msg = ""
                try { 
                    schema.getEntityModel(entity).schemaModel.where(query).update({ $set: set}).exec(function(err) {
                        resolve({'msg' : "updated"});
                    });
                }
                catch(e) {
                    msg = e.message;
                    console.log('Error:', msg)
                    resolve( {'msg' : msg } )
                } 
            });
            result = updateOrCreate.msg;
            res.writeHead(200, {
                'Content-Type': 'appliation/json',
            });
            res.end(JSON.stringify({ result: result})); 
        }
    };
};

