module.exports = function postEvent(params){
	//import statements to use multiple modules
	const mongoClient = require('mongodb').MongoClient;

	// Environment variable we are loading as params from config.json file
  const collectionName = params.collectionName;
  const databaseConnections =  params.mongoDB_connection;

  console.log("collection name -> "+collectionName);

  const event = {
    "hobbies": [
      {"name":""}
    ],
    "name": "",
    "host": "",
    "description": "",
    "venue": "",
    "date": "",
    "free": true,
    "entryfree": 0,
    "attendee": [ ],
    "rating": 0,
    "comments": [
      {
      	"commenter": "",
        "comment": "",
        "created": "",
        "replies": [
        	{
          	"reply": "",
            "replier": "",
            "created": ""
          }
        ]
      }
    ]
  };

  // Overright the properties sent from user to event object above
  const queryParam = Object.assign(event, params.event);

  // References to use throughtout
  let database;
  let dbClient;

  //add event to collection
  const addEventToCollection = (queryParam) => {
  	return new Promise((resolve, rejet)=>{
  		console.log('add Event here');
      
      mongoClient.connect(databaseConnections, (err, client)=>{
      	if(err){
  				console.log("error in DB connection -> "+err);
  				reject(`404:${err}`);
  			}
  			else{
  				dbClient = client;
  				database = client.db('hobbylocale');

  				// Get collection name from database
	  			const collection = database.collection(collectionName);

	  			// Add event to database
		  		collection.insertOne(queryParam, (err, respond) => {
		  			if(err){
		  				reject(`404:${err}`);
		  			}
            const op = respond.ops[0];
            console.log("resp > "+op);
		  			console.log('user '+op.name+' added');
		  			resolve(op);
		  		});
      	}
  		});
    });
  };


  //return event details and 
  //catch error if any
  return addEventToCollection(queryParam)
  	.then((data) => {
  		dbClient.close();		// Close DB client 
  		return ({
  			headers: {
        	'Content-Type': 'application/json'
      	},
      	statusCode: 200,
      	body : new Buffer(JSON.stringify(queryParam)).toString('base64')
  		});
  	})
  	.catch((error)=>{
  		dbClient.close();		// Close DB client 

  		console.log("error is --->> "+error);
      const status = error.split(':')[0];
      const errorMessage = error.split(':')[1];
  		console.log(errorMessage);
  		return ({
         headers: {
            'Content-Type': 'application/json'
          },
          statusCode: parseInt(status),
          body: new Buffer(JSON.stringify(errorMessage)).toString('base64')
      });
  	});

}