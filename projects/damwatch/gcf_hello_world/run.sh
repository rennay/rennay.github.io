

gcloud beta functions deploy imageFinalize --trigger-resource newfriendlychat-63187.appspot.com --trigger-event google.storage.object.finalize

gcloud beta functions deploy imageMetadataUpdate --trigger-resource newfriendlychat-63187.appspot.com --trigger-event google.storage.object.metadataUpdate

gcloud beta functions deploy imageDelete --trigger-resource newfriendlychat-63187.appspot.com --trigger-event google.storage.object.delete

gcloud beta functions deploy housekeepFirestore --trigger-http

gcloud beta functions deploy damWatchTrigger --trigger-http

gcloud beta functions deploy itemWatchTrigger --trigger-http

gcloud beta functions deploy helloWorld --trigger-http

curl -X POST -H "Content-Type:application/json"  -d '{"message":"hello world!"}' https://us-central1-newfriendlychat-63187.cloudfunctions.net/helloWorld

gcloud beta functions deploy helloPubSub --trigger-resource my-valuation-topic --trigger-event google.pubsub.topic.publish

gcloud beta functions deploy helloItemPubSub --trigger-resource my-item-trigger-topic --trigger-event google.pubsub.topic.publish

gcloud beta functions deploy helloSaturday --trigger-http

Cloud Functions Local Emulator

functions config set projectId newfriendlychat-63187

functions start
functions stop
functions kill

functions deploy helloWorld --trigger-http
functions deploy helloWorld --trigger-http --local-path=~/myFunction

functions call helloWorld
functions call helloWorld --data='{"message":"Hello World"}'

functions logs read

functions status

functions deploy addDeal --trigger-http

firebase deploy --only functions:dealOfferChange

gcloud beta functions deploy getOffer --trigger-http