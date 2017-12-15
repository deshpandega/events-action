module.exports = function postEvent(params){
	//import statements to use multiple modules
	const mongoClient = require('mongodb').MongoClient;

	// Environment variable we are loading as params from config.json file
  const collectionName = params.collectionName;
  const databaseConnections =  params.mongoDB_connection;

  console.log("collection name -> "+collectionName);

  // References to use throughtout
  let database;
  let dbClient;

  // get all event to collection
  const getAllEvents = () => {
  	return new Promise((resolve, rejet)=>{
  		console.log('get events here');

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

	  			// Get events from database
		  		collection.find({}).toArray((err, respond) => {
		  			if(err){
		  				reject(`404:${err}`);
		  			}
		  			const op = respond;
            console.log("resp > "+op);
		  			// console.log('user '+op.name+' added');
		  			resolve(op);
		  		});
  			}
  		});
  	});
  };

  //return event details and 
  //catch error if any
  return getAllEvents()
  .then((data) => {
  	dbClient.close();		// Close DB client 
  	return ({
  		headers: {
      	'Content-Type': 'application/json'
    	},
    	statusCode: 200,
    	body : new Buffer(JSON.stringify(data)).toString('base64')
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