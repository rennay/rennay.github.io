/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnkrsoln.selenium.utils;

import com.google.api.core.ApiFuture;
import com.google.cloud.ServiceOptions;
import com.google.cloud.pubsub.v1.Publisher;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.PubsubMessage;
import com.google.pubsub.v1.TopicName;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 *
 * @author nb309158
 */
public class Utils {
    // use the default project id
    private static final String PROJECT_ID = ServiceOptions.getDefaultProjectId();
    
    public static void publish(String topicId, List<String> jsonStringList) throws Exception {
        TopicName topicName = TopicName.create(PROJECT_ID, topicId);
        Publisher publisher = null;
        List<ApiFuture<String>> apiFutures = new ArrayList<>();
        try {
            // Create a publisher instance with default settings bound to the topic
            publisher = Publisher.defaultBuilder(topicName).build();

            Iterator<String> it = jsonStringList.iterator();
            while (it.hasNext()) {
                String jsonString = it.next();

                ByteString data = ByteString.copyFromUtf8(jsonString);
                PubsubMessage pubsubMessage = PubsubMessage.newBuilder().setData(data).build();

                ApiFuture<String> messageId = publisher.publish(pubsubMessage);
                apiFutures.add(messageId);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (publisher != null) {
                // When finished with the publisher, shutdown to free up resources.
                publisher.shutdown();
            }
        }    
    }        
}
