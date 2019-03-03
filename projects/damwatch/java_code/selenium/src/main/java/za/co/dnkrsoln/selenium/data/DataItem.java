package za.co.dnkrsoln.selenium.data;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author nb309158
 */
public class DataItem {
    private String uuid;        
    private String name;
    private String description;
    private Map<String, DataCollector> collectorMap;
    
    public DataItem() {
        uuid = java.util.UUID.randomUUID().toString();        
        collectorMap = new HashMap<>();
    }
    
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<String, DataCollector> getCollectorMap() {
        return collectorMap;
    }

    public void setCollectorMap(Map<String, DataCollector> collectorMap) {
        this.collectorMap = collectorMap;
    }
    
    public void addCollector(DataCollector collector) {
        this.collectorMap.put(collector.getID(), collector);
    }
    
    public void addCollector(String collectorID, DataCollector collector) {
        this.collectorMap.put(collectorID, collector);
    }
}
