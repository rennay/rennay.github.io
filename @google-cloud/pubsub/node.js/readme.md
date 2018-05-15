
# HOWTO: Google Cloud PubSub using Node.JS

Pay careful attention to the _package.json_
~~~~
npm install --save @google-cloud/pubsub
~~~~

Code samples demonstrate:
- How to create a topic
- Publishing a message to a topic
- Subscribing to a topic to receive messages
- Publishing a message to a topic from a Cloud Function
    - gcloud beta functions deploy [FUNCTION] --trigger-http
    - gcloud beta functions deploy httpTrigger --trigger-http
- Subscribing to a topic from a Cloud Function to receive messages
    - gcloud beta functions deploy [FUNCTION] --trigger-resource [TOPIC] --trigger-event google.pubsub.topic.publish
    - gcloud beta functions deploy helloPubSub --trigger-resource my-new-topic --trigger-event google.pubsub.topic.publish

