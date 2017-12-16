const getEvents = require('./actions/getEvents');
const searchEventsByHobby = require('./actions/searchEventsByHobby');
const updateEvent = require('./actions/updateEvent');
const postEvent = require('./actions/postEvent');
const getHostedEvents = require('./actions/getHostedEvents');
const getRegisteredEvents = require('./actions/getRegisteredEvents');
const getHobbies = require('./actions/getHobbies');
const addCommentToEvent = require('./actions/addCommentToEvent');



exports.getEvents = getEvents;
exports.searchEventsByHobby = searchEventsByHobby;
exports.updateEvent = updateEvent;
exports.postEvent = postEvent;
exports.getHostedEvents = getHostedEvents;
exports.getRegisteredEvents = getRegisteredEvents;
exports.getHobbies = getHobbies;
exports.addCommentToEvent = addCommentToEvent;