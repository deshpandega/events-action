module.exports =  function updateEvent (params) {
	//import statements to use multiple modules
	const mongoClient = require('mongodb').MongoClient;

	// Environment variable we are loading as params from config.json file
  const collectionName = params.collectionName;
  const databaseConnections =  params.mongoDB_connection;

  console.log("collection name -> "+collectionName);

  const event = {
  	"eid":"",
    "hobbies": [
      {"name":""}
    ],
    "name": "",
    "host": {
      "name":"",
      "email":"",
      "profileIcon":""
    },
    "description": "",
    "venue": "",
    "bannerIcon":"",
    "date": "",
    "duraction":"",
    "entryfee": 0,
    "attendee": [ 
      {
        "email":"",
        "name":"",
        "profileIcon":""
      }
    ],
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
  const eventParam = Object.assign(event, params.event);  
  
  // Overright the properties sent from user of attendee to blank attendee object above
  const attendeeParam = params.attendee;
 
  // References to use throughtout
  let database;
  let dbClient;
  
  //add event to collection
  const updateEventInCollection = (eventParam, attendeeParam) => {
  	return new Promise((resolve, rejet)=>{
  		console.log('Update Event here');

  		mongoClient.connect(databaseConnections, (err, client)=>{
  			if(err){
  				console.log("error in DB connection -> "+err);
  				reject(`404:${err}`);
  			}
  			else{
  				dbClient = client;
  				database = client.db('hobbylocale');

  				const idToUpdate = eventParam.eid;
  				console.log("This is value---> "+idToUpdate);

  				// Get collection name from database
	  			const collection = database.collection(collectionName);

	  			// Update event to database
	  			collection.update(
	  				{ eid : idToUpdate },
	  				{
	  					$push:{
	  						attendee: { email : attendeeParam.email , name : attendeeParam.name, profileIcon: attendeeParam.profileIcon }
	  					}
	  				},
	  				(err, respond)=>{
	  					if(err){
		  					reject(`404:${err}`);
		  				}
		  				const op = respond.result.nModified;
		  				if(op==0){
		  					reject(`401:${attendeeParam.name} not added to event ${eventParam.name}`);	
		  				}
		  				console.log("solved");
	  					resolve(op);
	  				});
  			}
  		});
  	});
  };

  //return event details and 
  //catch error if any
  return updateEventInCollection(eventParam, attendeeParam)
  .then((data) => {
  		dbClient.close();		// Close DB client 
  		return ({
  			headers: {
        	'Content-Type': 'application/json'
      	},
      	statusCode: 200,
      	body : new Buffer(JSON.stringify(`${attendeeParam.name} added to event ${eventParam.name}`)).toString('base64')
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