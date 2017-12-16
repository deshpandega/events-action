const getEvents = require('./actions/getEvents');
const searchEventsByHobby = require('./actions/searchEventsByHobby');
// const putEventById = require('./actions/putEventById');
const postEvent = require('./actions/postEvent');
const getHostedEvents = require('./actions/getHostedEvents');
// const addPayment = require('./actions/addPaymentMethod');

exports.getEvents = getEvents;
exports.searchEventsByHobby = searchEventsByHobby;
// exports.putEventById = putEventById;
exports.postEvent = postEvent;
exports.getHostedEvents = getHostedEvents;
// exports.addPayment = addPayment;