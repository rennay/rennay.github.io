/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.dnkrsoln.selenium.collector;

import java.util.Map;

/**
 *
 * @author nb309158
 */
public class CollectorDamDWA extends CollectorBase {

    @Override
    protected Map<String, Object> internalRun(String... params) throws Exception {
        String endpoint = params[0];
        driver.get(endpoint);
        for (int row = 2; row < 12; row++) {
            String province = findElementByXPath("//*[@id=\"form1\"]/div[5]/table/tbody/tr[2]/td/table/tbody/tr[" + row + "]/td[1]");
            String thisWeekPercentage = findElementByXPath("//*[@id=\"form1\"]/div[5]/table/tbody/tr[2]/td/table/tbody/tr[" + row + "]/td[3]");
            map.put(province, thisWeekPercentage);
        }

        return map;
    }

    @Override
    protected Double formatPrice(String priceString) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
