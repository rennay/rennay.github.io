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
public class DataGen {
    
    public DataGen() {
    }

    public static DataItem generateJSONJacobs() {
        DataItem item = new DataItem();
        item.setName("Jacobs Coffee");
        item.setDescription("Jacobs Krönung Instant Coffee 200g");
        
        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Food-Cupboard/Coffee-Tea-Hot-Drinks/Coffee/Instant-Coffee/Jacobs-Kr-nung-Instant-Coffee-200g/_/A-7622300001568");
        item.addCollector(woolworths);
        
        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/mddstorefront/game-za/en/All-Game-Categories/Groceries-%26-Household/Tea-%26-Coffee/Coffee/Kronung-Original-Coffee-200G-Jar/p/00548740");
        item.addCollector(game);

        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Beverages/Coffee%2C-Tea-%26-Creamers/Instant-Coffee/JACOBS-COFFEE-KRONUNG-INSTANT-200GR/p/000000000000162106_EA");
        item.addCollector(pnp);
        
        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/jacobs-/br-kronung-instant-coffee-/br-6-x-200g--57360CSZ");
        item.addCollector(makro);

        return item;
    }
    
    public static DataItem generateJSONVaselineIntensiveCare() {
        DataItem item = new DataItem();
        item.setName("Vaseline Intensive Care");
        item.setDescription("VASELINE BODY LOTION MEN 400ML COOLING");
        
        DataCollector dischem = new DataCollector();
        dischem.setID("Dischem");
        dischem.setEndpoint("https://dischem.co.za/product-view/75077/vaseline-body-lotion-men-400ml-cooling");
        item.addCollector(dischem);
        
        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/mddstorefront/game-za/en/All-Game-Categories/Health-%26-Beauty/Skin-Care/Hand-%26-Body-Lotions/Men-Even-Tone-Cooling-Body-Lotion-50ml/p/00573681");
        item.addCollector(game);

        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Health-%26-Beauty/Body-%26-Facial-Care/Body-Care/Body-Lotion/VASELINE-B-LOTION-FOR-MEN-COOLING-400ML/p/000000000000593542_EA");
        item.addCollector(pnp);
        
        DataCollector clicks = new DataCollector();
        clicks.setID("Clicks");
        clicks.setEndpoint("https://clicks.co.za/vaseline_men-repairing-moisture-body-lotion-cooling-400ml/p/133957");
        item.addCollector(clicks);
        
        DataCollector spar = new DataCollector();
        spar.setID("Spar");
        spar.setEndpoint("https://clicks.co.za/vaseline_men-repairing-moisture-body-lotion-cooling-400ml/p/133957");
        Map<String,Object> result = new HashMap<>();
        result.put("PRODUCT", "MANUAL: Vaseline Intensive Care Cooling");
        result.put("PRICE", new Double(52.99));
        result.put("OLD_PRICE", new Double(-1.0));
        result.put("TITLE", "MANUAL");
        result.put("TIMESTAMP", new java.util.Date());
//        result.put("IMAGE_URL", new FBStorage().storeFile("/Users/nb309158/Downloads/IMG_3127.jpg"));
        spar.addResult(result);
        item.addCollector(spar);        

        return item;
    }
    
    public static DataItem generateJSONKelloggsCornFlakes() {
        DataItem item = new DataItem();
        item.setName("Kellogg's Corn Flakes 500g");
        item.setDescription("Kellogg's Corn Flakes 500g");
        
        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/kellogg-s-/br-corn-flakes-/br-28-x-500g--170877CSZ");
        item.addCollector(makro);
        
        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/game-za/en/All-Game-Categories/Groceries-%26-Household/Cereals-%26-Porridges/Cereals/Corn-Flakes-Original-500G/p/00238516");
        item.addCollector(game);

        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Food-Cupboard/Breakfast-Cereals-%26-Bars/Family-Cereals/KELLOGG%27S-CORN-FLAKES-500GR/p/000000000000181189_EA");
        item.addCollector(pnp);
        
        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Food-Cupboard/Breakfast-Cereals-Bars/Breakfast-Cereals/Kellogg-s-Corn-Flakes-500g/_/A-6001306015501");
        item.addCollector(woolworths);
        
        DataCollector spar = new DataCollector();
        spar.setID("Spar");
        spar.setEndpoint("https://spar.co.za");
        Map<String,Object> result = new HashMap<>();
        result.put("PRODUCT", "MANUAL: Kelloggs Corn Flakes 500g");
        result.put("PRICE", new Double(32.99));
        result.put("OLD_PRICE", new Double(-1.0));
        result.put("TITLE", "MANUAL");
        result.put("TIMESTAMP", new java.util.Date());
//        result.put("IMAGE_URL", new FBStorage().storeFile("/Users/nb309158/Downloads/IMG_3127.jpg"));
        spar.addResult(result);
        item.addCollector(spar);        

        return item;
    }
    
    public static DataItem generateJSONChoiceAssorted() {
        DataItem item = new DataItem();
        item.setName("BAKERS Biscuits Choice Assorted 1kg");
        item.setDescription("BAKERS Biscuits Choice Assorted 1kg");
        
        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/bakers-/br-biscuits-choice-assorted-/br-1-x-1kg--280080EA");
        item.addCollector(makro);
        
        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/game-za/en/All-Game-Categories/Groceries-%26-Household/Biscuits%2C-Chips-%26-Snacks/Biscuits/Bakers-Choice-Assorted-1-kg/p/00679932");
        item.addCollector(game);

        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Food-Cupboard/Biscuits-%26-Crackers/Biscuits/Assorted-Biscuits/BAKERS-BISC-CHOICE-ASSTD-1KG/p/000000000000149381_EA");
        item.addCollector(pnp);
        
        return item;
    }    
    
    public static DataItem generateJSONFlora() {
        DataItem item = new DataItem();
        item.setName("Flora Magarine");
        item.setDescription("Flora Light Polyunsaturated Medium Fat Spread 500g");
        
        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Fresh-Food/Butter-%26-Margarine/Butter%2C-Spreads-%26-Margarine/Medium-Fat-Spreads/FLORA-LGHT-MED-FAT-SPREAD-TUB-500GR/p/000000000000216384_EA");
        item.addCollector(pnp);
        
        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Fresh-Food/Milk-Dairy-Eggs/Butter-Margarine/Margarine/Flora-Light-500g/_/A-6001087358149");
        item.addCollector(woolworths);

        return item;
    }    
    
    public static DataItem generateJSONSunlightDishwashing() {
        DataItem item = new DataItem();
        item.setName("Sunlight Dishwashing Liquid");
        item.setDescription("Sunlight Dishwashing Liquid 750ml");
        
        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Household-Cleaning/Dishwashing/Regular-Liquids/SUNLIGHT-DISHWASHING-LIQUID-750ML/p/000000000000679879_EA");
        item.addCollector(pnp);
        
        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Household/Household-Cleaning/Dishwashing/Dishwashing-Liquids/Sunlight-Original-Dishwashing-Liquid-750ml/_/A-6001087358743");
        item.addCollector(woolworths);
        
        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/sunlight-/br-dishwashing-liquid-/br-5-x-750ml--64980SWZ");
        item.addCollector(makro);
        
        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/game-za/en/All-Game-Categories/Groceries-%26-Household/Household/Dish-Washing-Detergents/Dishwashing-Liquid-Regular-Bottle-750ml/p/00718250");
        item.addCollector(game);
        
        DataCollector dischem = new DataCollector();
        dischem.setID("Dischem");
        dischem.setEndpoint("https://dischem.co.za/product-view/13324/sunlight-dishwashing-liquid-750ml-regular");
        item.addCollector(dischem);
        
        DataCollector clicks = new DataCollector();
        clicks.setID("Clicks");
        clicks.setEndpoint("https://clicks.co.za/sunlight_dishwashing-liquid-750ml/p/42331");
        item.addCollector(clicks);        

        return item;
    }        
    
    public static DataItem generateJSONLindt() {
        DataItem item = new DataItem();
        item.setName("Lindt Lindor Milk Chocolate 200g");
        item.setDescription("Lindt Lindor Milk Chocolate 200g");
        
        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Food-Cupboard/Chocolates-%26-Sweets/Chocolate-Bars%2C-Bags-%26-Packs/LINDOR-CORNET-MILK-200GR/p/000000000000575000_EA");
        item.addCollector(pnp);
        
        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Food-Cupboard/Chocolates-Sweets/Chocolates/Imported-Chocolates/Lindt-Lindor-Milk-Chocolate-200g/_/A-8003340095509");
        item.addCollector(woolworths);
        
        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/lindt-/br-cornet-truffles-box-chocolates-milk-/br-1-x-200g--64261002EA");
        item.addCollector(makro);
        
        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/game-za/en/All-Game-Categories/Groceries-%26-Household/Biscuits%2C-Chips-%26-Snacks/Chocolates/Lindor-Milk-Chocolate-Truffles-Box-200G/p/00606164");
        item.addCollector(game);
                
        DataCollector clicks = new DataCollector();
        clicks.setID("Clicks");
        clicks.setEndpoint("https://clicks.co.za/lindt_lindor-irresistibly-smooth-milk-chocolate-125g/p/235799");
        item.addCollector(clicks);        

        return item;
    }           
    
    public static DataItem generateJSONDam() {
        DataItem item = new DataItem();
        item.setName("DAM Levels");
        item.setDescription("Department of Water Affairs DAM Levels");

        DataCollector damDWA = new DataCollector();
        damDWA.setID("DAMDWA");
        damDWA.setEndpoint("http://www.dwa.gov.za/Hydrology/Weekly/SumProvince.aspx");
        item.addCollector(damDWA);

        return item;
    }    
    
    public static DataItem generateJSONProtex() {
        DataItem item = new DataItem();
        item.setName("Protex Sun Care");
        item.setDescription("Protex Bar Soap Sun Care 150gr");

        DataCollector dischem = new DataCollector();
        dischem.setID("Dischem");
        dischem.setEndpoint("https://dischem.co.za/product-view/164065/protex-soap-150g-suncare");
        item.addCollector(dischem);

        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/mddstorefront/game-za/en/All-Game-Categories/Health-%26-Beauty/Bath-%26-Shower/Soap-Bars/Protex-Soap-Suncare-150G/p/00760275");
        item.addCollector(game);

        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Health-%26-Beauty/Bath%2C-Shower-%26-Soap/Soap-Bars/PROTEX-BAR-SOAP-SUN-CARE-150GR/p/000000000000734179_EA");
        item.addCollector(pnp);

        DataCollector clicks = new DataCollector();
        clicks.setID("Clicks");
        clicks.setEndpoint("https://clicks.co.za/protex_antigerm-soap-bar-suncare-150g/p/193711");
        item.addCollector(clicks);
        
        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/protex-/br-soap-suncare-/br-12-x-150g--338971010SWZ");
        item.addCollector(makro);

        return item;
    }    
    
    public static DataItem generateJSONKerryGoldButter() {
        DataItem item = new DataItem();
        item.setName("Kerrygold Butter");
        item.setDescription("Kerrygold Softer Butter 250 GR");

        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Fresh-Food/Butter-%26-Margarine/Butter%2C-Spreads-%26-Margarine/Butter-Spreads/KERRYGOLD-SOFTER-BUTTER-250GR/p/000000000000172732_EA");
        item.addCollector(pnp);

        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Fresh-Food/Milk-Dairy-Eggs/Butter-Margarine/Butter/Kerrygold-Butter-250g/_/A-5011038133108");
        item.addCollector(woolworths);

        return item;
    }     
    
    public static DataItem generateBabySoftTwoPly18() {
        DataItem item = new DataItem();
        item.setName("18 2 Ply Toilet Paper");
        item.setDescription("Baby Soft");
        
        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Household/Household-Cleaning/Toilet-Paper-Wipes-Paper-Towels/Toilet-Paper/Baby-Soft-White-2Ply-Toilet-Paper-18Pk/_/A-6001019000252");
        item.addCollector(woolworths);        

        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/game-za/en/All-Game-Categories/Groceries-%26-Household/Household/Toilet-%26-Tissue-Paper/Toilet-Rolls-2Ply-White-18%27S/p/00432655");
        item.addCollector(game);

        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Household-Cleaning/Tissues-%26-Toilet-Paper/Toilet-Paper/2-Ply-Toilet-Paper/BABY-SOFT-T-PAPER-WHITE-2PLY-18EA/p/000000000000215170_EA");
        item.addCollector(pnp);

        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/baby-soft-/br-2-ply-toilet-paper-/br-4-x-18-s--9274CSZ");
        item.addCollector(makro);

        return item;
    }  

    public static DataItem generateHomeBrandTwoPly18() {
        DataItem item = new DataItem();
        item.setName("18 2 Ply Toilet Paper");
        item.setDescription("Baby Soft");
        
        DataCollector woolworths = new DataCollector();
        woolworths.setID("Woolworths");
        woolworths.setEndpoint("http://www.woolworths.co.za/store/prod/Food/Household/Household-Cleaning/Toilet-Paper-Wipes-Paper-Towels/Toilet-Paper/Super-Soft-2-Ply-Toilet-Paper-18Pk/_/A-6005000252309");
        item.addCollector(woolworths);        

        DataCollector dischem = new DataCollector();
        dischem.setID("Dischem");
        dischem.setEndpoint("https://dischem.co.za/product-view/63055/softi-toilet-rolls-2ply-18s");
        item.addCollector(dischem);

        DataCollector game = new DataCollector();
        game.setID("Game");
        game.setEndpoint("https://www.game.co.za/game-za/en/All-Game-Categories/Groceries-%26-Household/Household/Toilet-%26-Tissue-Paper/Toilet-Rolls-2Ply-White-18%27S/p/00601546");
        item.addCollector(game);

        DataCollector clicks = new DataCollector();
        clicks.setID("Clicks");
        clicks.setEndpoint("https://clicks.co.za/clicks_pay-less-2-ply-toilet-paper-18-rolls/p/235115");
        item.addCollector(clicks);
        
        DataCollector makro = new DataCollector();
        makro.setID("Makro");
        makro.setEndpoint("https://www.makro.co.za/groceries-and-toiletries/baby-soft-/br-2-ply-toilet-paper-/br-4-x-18-s--9274CSZ");
        item.addCollector(makro);

        return item;
    }      
    
    public static DataItem generateSkip2kgWashingPowder() {
        DataItem item = new DataItem();
        item.setName("Skip Auto Washing Powder 2kg");
        item.setDescription("Skip Auto Washing Powder 2kg");
        
        DataCollector pnp = new DataCollector();
        pnp.setID("PnP");
        pnp.setEndpoint("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/Household-Cleaning/Laundry-Detergents/Washing-Powder%2C-Liquid-%26-Gels/Automatic/SKIP-INTELL-FLEX-W-POWDER-2KG/p/000000000000359502_EA");
        item.addCollector(pnp);
        
        return item;
    }      
}
