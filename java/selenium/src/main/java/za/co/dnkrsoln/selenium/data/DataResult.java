package za.co.dnkrsoln.selenium.data;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author nb309158
 */
public class DataResult {
    private String PRODUCT;
    private double PRICE;
    private double OLD_PRICE;
    private String TITLE;
    private String TIMESTAMP;
    
    public DataResult() {
        
    }

    public String getPRODUCT() {
        return PRODUCT;
    }

    public void setPRODUCT(String PRODUCT) {
        this.PRODUCT = PRODUCT;
    }

    public double getPRICE() {
        return PRICE;
    }

    public void setPRICE(double PRICE) {
        this.PRICE = PRICE;
    }

    public double getOLD_PRICE() {
        return OLD_PRICE;
    }

    public void setOLD_PRICE(double OLD_PRICE) {
        this.OLD_PRICE = OLD_PRICE;
    }

    public String getTITLE() {
        return TITLE;
    }

    public void setTITLE(String TITLE) {
        this.TITLE = TITLE;
    }

    public String getTIMESTAMP() {
        return TIMESTAMP;
    }

    public void setTIMESTAMP(String TIMESTAMP) {
        this.TIMESTAMP = TIMESTAMP;
    }

    
}
