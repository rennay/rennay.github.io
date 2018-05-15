// Imports the Google Cloud client library
const PubSub = require(`@google-cloud/pubsub`);

// Your Google Cloud Platform project ID
const projectId = 'reversbid2020';

// Instantiates a client
const pubsubClient = new PubSub({
  projectId: projectId,
});

const subscriptionName = 'my-new-subscription';
const timeout = 60;

// References an existing subscription
const subscription = pubsubClient.subscription(subscriptionName);

// Create an event handler to handle messages
let messageCount = 0;
const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${message.attributes}`);
  messageCount += 1;

  var jsonString = JSON.parse(message.data);
  console.log("-- *foo: {" + jsonString.foo + "}");  

  // "Ack" (acknowledge receipt of) the message
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received.`);
}, timeout * 1000);