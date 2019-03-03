/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnkrsoln.selenium.subscriber;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class ItemSubscriberFirestore extends ItemSubscriberBase {
    private String SERVICE_ACCOUNT_CREDENTIALS = "/home/apps/NewFriendlyChat-b26df8f16da4.json";
    private String FIREBASE_USER = "newfriendlychat-63187@appspot.gserviceaccount.com";
    private String DATABASE_URL = "https://newfriendlychat-63187.firebaseio.com";
    private String FIREBASE_ROLE = "my-service-worker";
    private Firestore db;
    
    public ItemSubscriberFirestore() {
        try {
            // Use a service account
            InputStream serviceAccount = new FileInputStream(SERVICE_ACCOUNT_CREDENTIALS);
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .build();
            FirebaseApp.initializeApp(options);
            db = null;
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    protected void connectDatabase() {
        try {
            db = FirestoreClient.getFirestore();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }    

    @Override
    public void writeResult(Map<String, Object> docData, String collection, String collectorItemID, String collectorID) {
        try {
            boolean deltaFlag = false;
            connectDatabase();

            String path = collection + "/" + collectorItemID + "/collectors/" + collectorID;
            DocumentReference docRef = db.document(path);            
            CollectionReference resultsRef = docRef.collection("results");
            
            ApiFuture<QuerySnapshot> query = resultsRef.orderBy("TIMESTAMP", Query.Direction.DESCENDING).limit(1).get();

            // query.get() blocks on response
            QuerySnapshot querySnapshot = query.get();
            
            List<DocumentSnapshot> results = querySnapshot.getDocuments();
            
            /* No previous record */
            if (results.isEmpty()) {
                deltaFlag = true;
            }
            
            for (DocumentSnapshot result : results) {
                String itemKey = result.getId();
                
                Map<String, Object> data = result.getData();
                Iterator<String> it = data.keySet().iterator();
                while (it.hasNext()) {
                    String key = it.next();
                    Object value = data.get(key);
                    
                    if (!key.equals("TIMESTAMP")) {
                        Object oldValue = docData.get(key);
                        if (!value.equals(oldValue)) {
                            deltaFlag = true;
                            break;
                        }
                    }
                }
            }
            
            deltaFlag = true;

            System.out.println("deltaFlag (forced): " + deltaFlag);
            if (deltaFlag == true) {
                ApiFuture<DocumentReference> future = resultsRef.add(docData);
                DocumentReference resultRef = future.get();
                System.out.println("Added result with ID: " + resultRef.getId());

                path = collection + "/" + collectorItemID;
                docRef = db.document(path);
                Map<String, Object> update = new HashMap<>();
                update.put("lastupdate", new java.util.Date());

                ApiFuture<WriteResult> writeResult = docRef.set(update, SetOptions.merge());
                System.out.println("-- " + writeResult.get().getUpdateTime());
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
