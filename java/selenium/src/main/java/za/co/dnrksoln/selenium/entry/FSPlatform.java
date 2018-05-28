/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnrksoln.selenium.entry;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 *
 * @author nb309158
 */
public class FSPlatform {
    private String SERVICE_ACCOUNT_CREDENTIALS = "/Users/nb309158/Downloads/NewFriendlyChat-b26df8f16da4.json";
    private String FIREBASE_USER = "newfriendlychat-63187@appspot.gserviceaccount.com";
    private String DATABASE_URL = "https://newfriendlychat-63187.firebaseio.com";
    private String STORAGE_URL = "newfriendlychat-63187.appspot.com";
    private String FIREBASE_ROLE = "my-service-worker";
    private static boolean initialised = false;
    
    protected Firestore db;

    public FSPlatform() {
        
    }

    private void initialise() throws Exception {
        if (initialised == false) {
            // Use a service account
            InputStream serviceAccount = new FileInputStream(SERVICE_ACCOUNT_CREDENTIALS);
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .build();
            FirebaseApp.initializeApp(options);
            
            initialised = true;
        }
    }
    
    protected void connectDatabase() {
        try {
            initialise();
            
            db = FirestoreClient.getFirestore();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    protected void disconnectDatabase() {
        try {
            System.out.println("-- Disconnecting...");
        } catch (Exception e) {
            e.addSuppressed(e);
        }
    }
    
    
}
