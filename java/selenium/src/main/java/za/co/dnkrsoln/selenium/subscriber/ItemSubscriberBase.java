/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnkrsoln.selenium.subscriber;

import com.google.api.gax.batching.FlowControlSettings;
import com.google.cloud.ServiceOptions;
import com.google.cloud.pubsub.v1.AckReplyConsumer;
import com.google.cloud.pubsub.v1.Subscriber;
import com.google.gson.Gson;
import com.google.pubsub.v1.PubsubMessage;
import com.google.pubsub.v1.SubscriptionName;
//import com.rennay.googlepubsub.CollectorBase;
//import com.rennay.googlepubsub.CollectorClicks;
//import com.rennay.googlepubsub.CollectorDamDWA;
//import com.rennay.googlepubsub.CollectorDischem;
//import com.rennay.googlepubsub.CollectorGame;
//import com.rennay.googlepubsub.CollectorMakro;
//import com.rennay.googlepubsub.CollectorPnP;
//import com.rennay.googlepubsub.CollectorValuation;
//import com.rennay.googlepubsub.CollectorWoolworths;
//import com.sandbox.data.DataCollector;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import za.co.dnkrsoln.selenium.collector.CollectorBase;
import za.co.dnkrsoln.selenium.collector.CollectorDamDWA;
import za.co.dnkrsoln.selenium.data.DataCollector;

/**
 *
 * @author nb309158
 */
public abstract class ItemSubscriberBase {
    protected final String PROJECT_ID = ServiceOptions.getDefaultProjectId();
    protected final BlockingQueue<PubsubMessage> messages;
    protected HashMap<String, Class> collectorMap;

    public ItemSubscriberBase() {
        messages = new LinkedBlockingDeque<>();
        
        collectorMap = new HashMap<>();
//        collectorMap.put("Woolworths", CollectorWoolworths.class);
//        collectorMap.put("Game", CollectorGame.class);
//        collectorMap.put("PnP", CollectorPnP.class);
//        collectorMap.put("Dischem", CollectorDischem.class);
//        collectorMap.put("Clicks", CollectorClicks.class);
//        collectorMap.put("Makro", CollectorMakro.class);
        collectorMap.put("DAMDWA", CollectorDamDWA.class);
//        collectorMap.put("Valuation", CollectorValuation.class);
    }
    
    // use the default project id
    class MessageReceiverExample implements com.google.cloud.pubsub.v1.MessageReceiver {

        @Override
        public void receiveMessage(PubsubMessage message, AckReplyConsumer consumer) {
            messages.offer(message);

            try {
                /* Message received */
                String jsonString = message.getData().toStringUtf8();

                /* Parse JSON object to Java */
                Gson gson = new Gson();

                DataCollector collector = gson.fromJson(jsonString, DataCollector.class);
                String collectorCollectionName = collector.getCollectionName();
                String collectorItemID = collector.getItemID();
                String collectorID = collector.getID();
                String endpoint = collector.getEndpoint();
                String erfNumber = collector.getErfNumber();
                String portionNumber = collector.getPortionNumber();
                String township = collector.getTownship();

                System.out.println("-- collectorCollection: [" + collectorCollectionName + "]");
                System.out.println("-- collectorItemID: [" + collectorItemID + "]");
                System.out.println("-- collectorID: [" + collectorID + "]");
                System.out.println("-- endpoint: [" + endpoint + "]");
                System.out.println("-- erfNumber: [" + erfNumber + "]");
                System.out.println("-- portionNumber: [" + portionNumber + "]");
                System.out.println("-- township: [" + township + "]");
                
                /* Collect information from the site */
                Class collectorBaseClass = collectorMap.get(collector.getID());
                if (collectorBaseClass != null) {
                    CollectorBase collectorBase = (CollectorBase) collectorBaseClass.newInstance();
                    String[] params = { endpoint, erfNumber, portionNumber, township};
                    Map<String, Object> map = collectorBase.run(params);
                    
                    if (map != null) {
                        writeResult(map, collectorCollectionName, collectorItemID, collectorID);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            finally {
//                if (client != null) {
//                    System.out.println("-- Closing client...");
//                    client.close();
//                }
            }
            System.out.println("Acknowledging message...");
            consumer.ack();
        }
    } 
   
    public abstract void writeResult(Map<String, Object> map, String collectorCollectionName, String collectorItemID, String collectorID);
    
    public void run() {
        // set subscriber id, eg. my-sub
        String subscriptionId = "my-sub";
        SubscriptionName subscriptionName = SubscriptionName.create(PROJECT_ID, subscriptionId);
        Subscriber subscriber = null;
        try {
//             create a subscriber bound to the asynchronous message receiver
            long maxMessageCount = 4;
            // Configure max number of messages to be pulled
            FlowControlSettings flowControlSettings = FlowControlSettings.newBuilder().setMaxOutstandingElementCount(maxMessageCount).build();
            subscriber = Subscriber.newBuilder(subscriptionName, new ItemSubscriberBase.MessageReceiverExample())
                            .setFlowControlSettings(flowControlSettings)
                            .build();
        
//            subscriber =
//                Subscriber.defaultBuilder(subscriptionName, new ItemSubscriberBase.MessageReceiverExample()).build();
            System.out.println("-- Waiting for messages...");
            subscriber.startAsync().awaitRunning();
            // Continue to listen to messages
            while (true) {
                PubsubMessage message = messages.take();
                System.out.println("Message Id: " + message.getMessageId());
                System.out.println("Data: " + message.getData().toStringUtf8());
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (subscriber != null) {
                subscriber.stopAsync();
            }
        }            
    }    
           
}
