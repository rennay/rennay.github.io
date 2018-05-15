/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
exports.helloPubSub = (event, callback) => {
  var ctx = event.context;
  var eventId = ctx.eventId;
  console.log("eventId: " + eventId);

  const pubsubMessage = event.data;

  var data = JSON.parse(Buffer.from(pubsubMessage.data, 'base64').toString());
  console.log('data: ' + data);
  console.log("-- foo: {" + data.foo + "}");  
  
  callback();
};