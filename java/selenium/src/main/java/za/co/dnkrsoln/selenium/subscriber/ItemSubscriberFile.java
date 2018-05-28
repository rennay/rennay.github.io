/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnkrsoln.selenium.subscriber;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

public class ItemSubscriberFile extends ItemSubscriberBase {

    private static final String FILENAME = "/tmp/filename.csv";

    public ItemSubscriberFile() {
    }

    @Override
    public synchronized void writeResult(Map<String, Object> docData, String collection, String collectorItemID, String collectorID) {
        BufferedWriter bw = null;
        FileWriter fw = null;

        try {
            fw = new FileWriter(FILENAME, true);
            bw = new BufferedWriter(fw);
            String content = "";

            Iterator<String> it = docData.keySet().iterator();
            while (it.hasNext()) {
                String key = it.next();
                Object value = docData.get(key);

                System.out.println("-- [" + key + "] {" + value + "}");
                content += value;
                if (it.hasNext()) {
                    content += "|";
                }
                else {
                    content += "\n";
                }
            }
            bw.write(content);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {

                if (bw != null) {
                    bw.close();
                }

                if (fw != null) {
                    fw.close();
                }

            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}
