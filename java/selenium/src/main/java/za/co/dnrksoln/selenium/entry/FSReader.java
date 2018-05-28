/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnrksoln.selenium.entry;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import za.co.dnkrsoln.selenium.data.DataCollector;
import za.co.dnkrsoln.selenium.utils.Utils;

/**
 *
 * @author nb309158
 */
public class FSReader extends FSPlatform {

    public FSReader() {
    }

    public void run(String collection, String itemReference) {
        try {
            connectDatabase();

            // asynchronously retrieve all items
            ApiFuture<QuerySnapshot> query = db.collection(collection).get();
            
            if (itemReference != null) {
                query = db.collection(collection).whereEqualTo("uuid", itemReference).get();
            }

            // query.get() blocks on response
            QuerySnapshot querySnapshot = query.get();

            Gson gson = new Gson();
            List<String> jsonStringList = new LinkedList<>();
            List<DocumentSnapshot> documents = querySnapshot.getDocuments();
            for (DocumentSnapshot document : documents) {
                jsonStringList.clear();
//                String itemKey = document.getId();
                DocumentReference itemDocumentReference = document.getReference();

                CollectionReference collectorsCollectionReference = itemDocumentReference.collection("collectors");

                //asynchronously retrieve multiple documents
                ApiFuture<QuerySnapshot> future = collectorsCollectionReference.get();
                List<DocumentSnapshot> collectors = future.get().getDocuments();
                for (DocumentSnapshot collector : collectors) {
                    String endpoint = (String) collector.get("endpoint");
                    String id = (String) collector.get("ID");
                    String itemID = (String) collector.get("itemID");

//                    System.out.println("-- ID: " + id + " endpoint: " + endpoint);
                    DataCollector dataCollector = new DataCollector();
                    dataCollector.setCollectionName(collection);
                    dataCollector.setItemID(itemID);
                    dataCollector.setID(id);
                    dataCollector.setEndpoint(endpoint);
                    String jsonString = gson.toJson(dataCollector);
                    System.out.println("-- jsonString: [" + jsonString + "]");
                    jsonStringList.add(jsonString);
                }
                Utils.publish("my-topic", jsonStringList);                            
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            disconnectDatabase();
        }
    }

    public void runTemp(String collection, String collectorItemID, String collectorID) {
        try {
            connectDatabase();

            String path = collection + "/" + collectorItemID + "/collectors/" + collectorID;

            DocumentReference docRef = db.document(path);
            
            Map<String, Object> update = new HashMap<>();
            update.put("lastrun", new java.util.Date());
                    
            ApiFuture<WriteResult> writeResult =
            docRef.set(update, SetOptions.merge());                    
            

            CollectionReference resultsRef = docRef.collection("results");
            Map<String, Object> docData = new HashMap<>();
            docData.put("PRICE", 50.10);
            docData.put("TIMESTAMP", new java.util.Date());

            ApiFuture<DocumentReference> future = resultsRef.add(docData);
            DocumentReference resultRef = future.get();
            System.out.println("Added result with ID: " + resultRef.getId());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void runValuation(String endpoint) {
        try {
            Gson gson = new Gson();

            List<String> jsonStringList = new LinkedList<>();
            
//            for (int i=834; i < 1184; i++) {
            for (int i=2982; i < 3049; i++) {
                DataCollector dataCollector = new DataCollector();
                dataCollector.setID("Valuation");
                dataCollector.setEndpoint(endpoint);
                dataCollector.setErfNumber("" + i);
                dataCollector.setPortionNumber("");
                dataCollector.setTownship("JUKSKEI VIEW EXT.38");

                String jsonString = gson.toJson(dataCollector);
                System.out.println("-- jsonString: [" + jsonString + "]");
                jsonStringList.add(jsonString);
            }

            Utils.publish("my-valuation-topic", jsonStringList);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
    }

    public static void main(String[] args) throws Exception {
        long now = System.currentTimeMillis();

        FSReader reader = new FSReader();

//        
        reader.run("newdam", null);
//        reader.run("items", null);
//        reader.run("items", "3fa6d8dc-8254-7d01-884b-f404e7c69108");
//        reader.runTemp("items", "MC20UhP6NcWfvvQCXclH", "Dischem");

//        reader.runValuation("https://coj2018.evaluations.co.za/eServices/Secure/search.aspx");

//        Thread.sleep(10000);
        System.out.println("Time taken: " + (System.currentTimeMillis() - now));
    }
}
