/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnrksoln.selenium.entry;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.WriteResult;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import za.co.dnkrsoln.selenium.data.DataCollector;
import za.co.dnkrsoln.selenium.data.DataGen;
import za.co.dnkrsoln.selenium.data.DataItem;

/**
 *
 * @author nb309158
 */
public class FSWriter extends FSPlatform {

    public void connect() {
        connectDatabase();
    }

    public void disconnect() {
        disconnectDatabase();
    }
   
    
    public void run(String collection, DataItem item) throws Exception {
        CollectionReference roootCollectionReference = db.collection(collection);
        
        Map<String, Object> docData = new HashMap<>();
        docData.put("uuid", item.getUuid());        
        docData.put("name", item.getName());
        docData.put("description", item.getDescription());
        docData.put("lastupdate", new java.util.Date());
        
        ApiFuture<DocumentReference> future = roootCollectionReference.add(docData);
        
        DocumentReference itemDocumentReference = future.get();
        String itemKey = itemDocumentReference.getId();
        System.out.println("Added document with ID: " + itemKey);        
        
        CollectionReference collectorsCollectionReference = itemDocumentReference.collection("collectors");
        
        Map<String, DataCollector> collectorMap = item.getCollectorMap();
        Iterator<String> it = item.getCollectorMap().keySet().iterator();
        while (it.hasNext()) {
            String collectorID = it.next();
            DataCollector dataCollector = collectorMap.get(collectorID);
            
            DocumentReference collectorDocumentReference = collectorsCollectionReference.document(collectorID);
            docData.clear();
            docData.put("itemID", itemKey);
            docData.put("ID", dataCollector.getID());
            docData.put("endpoint", dataCollector.getEndpoint());
            
            ApiFuture<WriteResult> writeResult = collectorDocumentReference.set(docData);
            System.out.println("Update time : " + writeResult.get().getUpdateTime());
            
            CollectionReference resultsCollectionRefence = collectorDocumentReference.collection("results");
            List<Map<String,Object>> results = dataCollector.getResults();
            for (int i=0;i < results.size();i++) {
                Map<String, Object> resultMap = results.get(i);
                
                future = resultsCollectionRefence.add(resultMap);
                DocumentReference resultDocumentReference = future.get();
                System.out.println("Added result with ID: " + resultDocumentReference.getId());        
            }
        }
    }
    
    public static void main(String[] args) {
        long now = System.currentTimeMillis();

        FSWriter writer = new FSWriter();
        try {
            writer.connect();

            writer.run("newdam", DataGen.generateJSONDam());
//            writer.run("items", DataGen.generateJSONVaselineIntensiveCare());
//            writer.run("items", DataGen.generateJSONJacobs());
//            writer.run("items", DataGen.generateJSONKerryGoldButter());
//            writer.run("items", DataGen.generateJSONLindt());
//            writer.run("items", DataGen.generateJSONProtex());
//            writer.run("items", DataGen.generateJSONSunlightDishwashing());
//            writer.run("items", DataGen.generateJSONChoiceAssorted());
//            writer.run("items", DataGen.generateJSONKelloggsCornFlakes());

//            writer.run("items", DataGen.generateHomeBrandTwoPly18());

//              writer.run("items", DataGen.generateSkip2kgWashingPowder());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            writer.disconnect();
        }

        System.out.println("Time taken: " + (System.currentTimeMillis() - now));

    }    
}
