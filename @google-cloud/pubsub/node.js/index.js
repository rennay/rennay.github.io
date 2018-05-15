// Imports the Google Cloud client library
var pubsub = require('@google-cloud/pubsub')();

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

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.httpTrigger = (req, res) => {
  // The name for the topic
  const topicName = 'my-new-topic';

  const data = JSON.stringify({ foo: 'bar' });

  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);
  
  pubsub
    .topic(topicName)
    .publisher()
    .publish(dataBuffer)
    .then(results => {
      const messageId = results[0];
      console.log(`Message ${messageId} published.`);
      res.status(200).send(`Message ${messageId} published.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(200).send(`ERROR: ${err}`);
    });
};
