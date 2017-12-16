const getEvents = require('./actions/getEvents');
const searchEventsByHobby = require('./actions/searchEventsByHobby');
// const putEventById = require('./actions/putEventById');
const postEvent = require('./actions/postEvent');
const getHostedEvents = require('./actions/getHostedEvents');
const getRegisteredEvents = require('./actions/getRegisteredEvents');
const getHobbies = require('./actions/getHobbies');



exports.getEvents = getEvents;
exports.searchEventsByHobby = searchEventsByHobby;
// exports.putEventById = putEventById;
exports.postEvent = postEvent;
exports.getHostedEvents = getHostedEvents;
exports.getRegisteredEvents = getRegisteredEvents;
exports.getHobbies = getHobbies;