package za.co.dnkrsoln.selenium.data;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author nb309158
 */
public class DataCollector {
    private String collectionName;
    private String itemID;
    private String ID;
    private String endpoint;
    
    private String erfNumber;
    private String portionNumber;
    private String township;
    
    private List<Map<String,Object>> results;
    
    public DataCollector() {
        results = new LinkedList<>();
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }
    
    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }    
    
    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public String getErfNumber() {
        return erfNumber;
    }

    public void setErfNumber(String erfNumber) {
        this.erfNumber = erfNumber;
    }

    public String getPortionNumber() {
        return portionNumber;
    }

    public void setPortionNumber(String portionNumber) {
        this.portionNumber = portionNumber;
    }

    public String getTownship() {
        return township;
    }

    public void setTownship(String township) {
        this.township = township;
    }
    
    public void addResult(Map<String,Object> result) {
        this.results.add(result);
    }

    public List<Map<String, Object>> getResults() {
        return results;
    }

    public void setResults(List<Map<String, Object>> results) {
        this.results = results;
    }

}
