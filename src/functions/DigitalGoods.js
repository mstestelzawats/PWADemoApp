export async function DigitalGoodsPurchase(IAPToken) {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const items = await service.getDetails([IAPToken]);
        const request = new PaymentRequest([{
            supportedMethods: 'https://store.microsoft.com/billing',
            data: { itemId: items[0].itemId },
        }]);
        const response = await request.show();
        await response.complete();
        alert(items[0].title + " purchase successful!");
        return;
    } catch (error) {
        console.error("Error:", error.message);
        return;
    }
}

export async function GetDetails() {
    var productDetails = "";
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return productDetails;
    }
    try {
        const service = await window.getDigitalGoodsService("https://store.microsoft.com/billing");
        const details = await service.getDetails(["SCCPWATestAppSubscription1", "Coins", "RemoveAds"]);
        for (const item of details) {
            if(item.itemId === "SCCPWATestAppSubscription1"){
                productDetails = "" + productDetails + item.title + ": " + item.description + " Price: " + item.price.value + " " + item.price.currency + " " + item.subscriptionPeriod + " Renewal period" + "\n";
            }else{
                productDetails = "" + productDetails + item.title + ": " + item.description + " Price: " + item.price.value + " " + item.price.currency + "\n";
            }
        }
        return productDetails;
    } catch (error) {
        console.error("Error:", error.message);
        return productDetails;
    }
}

export async function UpdatePurchases() {
    var pro = false;
    var coin = false;
    var ads = false;
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return [pro, coin, ads];
    }
    try {
        const service = await window.getDigitalGoodsService("https://store.microsoft.com/billing");
        const purchases = await service.listPurchases();
        for (const item of purchases) {
          if(item.itemId === "SCCPWATestAppSubscription1"){
            pro = true;
          }
          if(item.itemId === "Coins"){
            coin = true;
          }
          if(item.itemId === "RemoveAds"){
            ads = true;
          }
        }
        return [pro, coin, ads];
    } catch (error) {
        console.error("Error:", error.message);
        return [pro, coin, ads];
    }
}

export async function UseCoins(){
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return false;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const purchases = await service.listPurchases();
        for (const p of purchases) {
            if(p.itemId === "Coins")
            {
                service.consume("9P7WL3ZK0C6K");
                alert("PLUS FIVE COINS");
                return true;
            }
        }
        alert("NO COINS TO USE");
        return false;
    } catch (error) {
        alert("Error while using coins");
        console.error("Error:", error.message);
        return false;
    }
    return false;
}

export async function WinrtCalls(){
alert("Making Winrt Calls");
const Windows = chrome.webview.hostObjects.sync.Windows;
if(Windows.Globalization.Language == undefined)
{
    alert("Undefined Langauge");
}
var name = Windows.Globalization.Language("en-US").displayName;
alert(name);
if(Windows.Services.Store.StoreContext == undefined)
{
    alert("Undefined Context");
}
var storeContext = Windows.Services.Store.StoreContext.getDefault();
alert("End WinrtCalls");
}