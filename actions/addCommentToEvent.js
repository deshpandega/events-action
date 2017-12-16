module.exports =  function addCommentToEvent (params) {
	//import statements to use multiple modules
	const mongoClient = require('mongodb').MongoClient;

	// Environment variable we are loading as params from config.json file
  const collectionName = params.collectionName;
  const databaseConnections =  params.mongoDB_connection;

  console.log("collection name -> "+collectionName);

  const event_id = params.eventId;
  const commentAdded = {
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
  };

  // Overright the properties sent from user to comment object above
  const queryComment = Object.assign(commentAdded, params.comment);  

  // References to use throughtout
  let database;
  let dbClient;

  //add event to collection
  const addCommentToEvent = (event_id, queryComment) => {
  	return new Promise((resolve, rejet)=>{
  		console.log('Add Comment Here');

  		mongoClient.connect(databaseConnections, (err, client)=>{
  			if(err){
  				console.log("error in DB connection -> "+err);
  				reject(`404:${err}`);
  			}
  			else{
  				dbClient = client;
  				database = client.db('hobbylocale');

  				const idToUpdate = event_id;
  				console.log("This is value---> "+idToUpdate);

  				// Get collection name from database
	  			const collection = database.collection(collectionName);

	  			// Update event to database
	  			collection.update(
	  				{ eid : idToUpdate },
	  				{
	  					$push:{
	  						comments: {
	  							commenter : queryComment.commenter , 
	  							comment : queryComment.comment, 
	  							created: new Date(), 
	  							replies: [	] 
	  						}
	  					}
	  				},
	  				(err, respond)=>{
	  					if(err){
		  					reject(`404:${err}`);
		  				}
		  				if(respond.result.nModified==0){
		  					reject(`401:Failed to add your comment to event`);	
		  				}
		  				console.log("solved");
	  					resolve(respond.result.nModified);
	  				}
	  			);
  			}
  		});
  	});
  };

  //return event details and 
  //catch error if any
  return addCommentToEvent(event_id, queryComment)
  .then((data) => {
  	dbClient.close();		// Close DB client 
  	return ({
  		headers: {
       	'Content-Type': 'application/json'
      },
      statusCode: 200,
      body : new Buffer(JSON.stringify(`Comment added successfully to event`)).toString('base64')
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