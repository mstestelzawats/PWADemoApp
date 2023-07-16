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
        alert(items[0].title + " purchase successful!");
    } catch (error) {
        console.error("Error:", error.message);
        return;
    }
}

export async function GetDetails(proPrice, coinPrice, adsPrice, productDetails) {
    var proPrice = "0.99 USD";
    var coinPrice = "0.99 USD";
    var adsPrice = "0.99 USD";
    var productDetails = "";
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return [proPrice, coinPrice, adsPrice, productDetails];
    }
    try {
        const service = await window.getDigitalGoodsService("https://store.microsoft.com/billing");
        const details = await service.getDetails(["SCCPWATestAppSubscription1", "Coins", "RemoveAds"]);
        for (const item of details) {
            if(item.itemId === "SCCPWATestAppSubscription1"){
                proPrice = "" + item.price.value + " " + item.price.currency + " " + item.subscriptionPeriod + " Renewal period";
            }
            if(item.itemId === "Coins"){
                coinPrice = "" + item.price.value + " " + item.price.currency;
            }
            if(item.itemId === "RemoveAds"){
                adsPrice = "" + item.price.value + " " + item.price.currency;
            }
            productDetails = productDetails + item.title + ": " + item.description + "\n";
        }
        return [proPrice, coinPrice, adsPrice, productDetails];
    } catch (error) {
        console.error("Error:", error.message);
        return [proPrice, coinPrice, adsPrice, productDetails];
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