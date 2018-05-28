/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnkrsoln.selenium.subscriber;

/**
 *
 * @author nb309158
 */
public class ItemSubscriberDriver {
   /**
     * Receive messages over a subscription.
     */
    public static void main(String... args) throws Exception {
        System.out.println("Hello world...");
        
//        ItemSubscriberBase x = new ItemSubscriberFile();
        ItemSubscriberBase x = new ItemSubscriberFirestore();
        x.run();
    }
    
}
