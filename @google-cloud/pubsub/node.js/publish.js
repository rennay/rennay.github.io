// Imports the Google Cloud client library
const PubSub = require(`@google-cloud/pubsub`);

// Your Google Cloud Platform project ID
const projectId = 'reversbid2020';

// Instantiates a client
const pubsubClient = new PubSub({
    projectId: projectId,
});

// The name for the new topic
const topicName = 'my-new-topic';

const data = JSON.stringify({ foo: 'bar' });

// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
const dataBuffer = Buffer.from(data);

pubsubClient
    .topic(topicName)
    .publisher()
    .publish(dataBuffer)
    .then(messageId => {
        console.log(`Message ${messageId} published.`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
