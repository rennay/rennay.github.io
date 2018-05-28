/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnkrsoln.selenium.collector;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.json.simple.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

/**
 *
 * @author nb309158
 */
public abstract class CollectorBase {
    protected ChromeOptions options;
    protected WebDriver driver;
    protected WebElement element;
    protected HashMap<String, Object> map;

    protected final String KEY_TITLE = "TITLE";
    protected final String KEY_PRODUCT = "PRODUCT";
    protected final String KEY_PRICE = "PRICE";
    protected final String KEY_OLD_PRICE = "OLD_PRICE";
    protected final String KEY_TIMESTAMP = "TIMESTAMP";
    protected final String KEY_PRODUCT_CODE = "PRODUCT_CODE";
    
    public CollectorBase() {
        // Add options to Google Chrome. The window-size is important for responsive sites
        options = new ChromeOptions();
//        options.addArguments("headless");
        options.addArguments("window-size=1200x600");
        driver = new ChromeDriver(options);
        map = new HashMap<>();
    }

    /**
     * Pings a HTTP URL. This effectively sends a HEAD request and returns
     * <code>true</code> if the response code is in the 200-399 range.
     *
     * @param url The HTTP URL to be pinged.
     * @param timeout The timeout in millis for both the connection timeout and
     * the response read timeout. Note that the total timeout is effectively two
     * times the given timeout.
     * @return <code>true</code> if the given HTTP URL has returned response
     * code 200-399 on a HEAD request within the given timeout, otherwise
     * <code>false</code>.
     */
    public static boolean pingURL(String url, int timeout) {
        url = url.replaceFirst("^https", "http"); // Otherwise an exception may be thrown on invalid SSL certificates.

        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setConnectTimeout(timeout);
            connection.setReadTimeout(timeout);
            connection.setRequestMethod("HEAD");
            int responseCode = connection.getResponseCode();
            return (200 <= responseCode && responseCode <= 403);
        } catch (IOException exception) {
            return false;
        }
    }

    public Map<String, Object> run(String... params) {
        String endpoint = params[0];
        Map returnMap = null;
        try {
//            boolean ping = pingURL(endpoint, 30000);
            boolean ping = true;
            System.out.println("-- pingURL: " + this.getClass().getName() + "-- " + ping);
            if (ping) {
//                Thread.sleep(3000);
                returnMap = internalRun(params);
//                returnMap = new HashMap();
//
//                returnMap.put("A", "A");
//                returnMap.put("B", "B");
//                returnMap.put("C", "C");
//                returnMap.put("D", "D");

                returnMap.put(KEY_TIMESTAMP, new java.util.Date());
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //Close the browser
            System.out.println("Stopping driver...");
            driver.quit();
        }
        return returnMap;
    }

    protected abstract Map<String, Object> internalRun(String... params) throws Exception;

    protected abstract Double formatPrice(String priceString);

    protected String generateJSON(HashMap<String, Object> map) {
        JSONObject obj = new org.json.simple.JSONObject();

        Iterator<String> it = map.keySet().iterator();
        while (it.hasNext()) {
            String key = it.next();
            Object value = map.get(key);

            obj.put(key, value);
        }
        obj.put(KEY_TIMESTAMP, new java.util.Date().toString());
        return obj.toJSONString();
    }

    protected String findElementByXPath(String xpath) {
        String text = "-";
        try {
            element = driver.findElement(By.xpath(xpath));
            text = element.getText();
        } catch (Exception e) {
        }
        return text;
    }
    
    protected String findElementByClassName(String className) {
        return findElementByClassName(className, 0);
    }

    protected String findElementByClassName(String className, int index) {
        String text = "-";
        try {
            List<WebElement> elements = driver.findElements(By.className(className));
//            for (int i=0; i < elements.size(); i++) {
//                element = elements.get(i);
//                System.out.println("-- i:" + i + " -- " + element.getText() + " -- " + className);
//            }
            int x = elements.size();
            if (elements.size() > index) {
                element = elements.get(index);
//                element = driver.findElement(By.className(className));
                text = element.getText();
            }
        } catch (Exception e) {

        }
        return text;
    }
    
    protected String findElementByClassName(String className, String childClassName) {
        String text = "-";
        try {
            List list = driver.findElements(By.className(className));
            Iterator it = list.iterator();
            while (it.hasNext()) {
                element = (WebElement) it.next();
                element = element.findElement(By.className(childClassName));
                if (element != null) {
                    text = element.getText();
                    break;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return text;
    }

    protected String findElementById(String id) {
        String text = "-";
        try {
            element = driver.findElement(By.id(id));
            text = element.getText();
        } catch (Exception e) {

        }
        return text;
    }
}
