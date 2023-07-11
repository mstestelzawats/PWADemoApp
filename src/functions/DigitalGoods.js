var service;

async function GetService()
{
    var counter = 0;
    do {
        alert("entering loop");
        counter++;
        if (service !== undefined)
        {
            alert("service defined");
            return;
        }
        if (window.getDigitalGoodsService === undefined) {
            // Digital Goods API is not supported in this context.
            alert("getDigitalGoodsService is undefined");
            return;
        }
        try {
            alert("getDigitalGoodsService is defined, trying to get service");
            service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        } catch (error) {
            console.error("Failed to get service:", error.message);
        }
    } while (service === undefined && counter < 5)
}

async function DigitalGoodsPurchase(IAPToken) {
    try {
        GetService();
        const items = await service.getDetails([IAPToken]);
        const request = new PaymentRequest([{
            supportedMethods: 'https://store.microsoft.com/billing',
            data: { itemId: items[0].itemId },
        }]);
        const response = await request.show();
    } catch (error) {
        console.error("Failed to get service:", error.message);
        return;
    }
}

export function DigitalGoodsConfirmPurchases() {
    try {
        GetService();
        purchases = service.listPurchases();
        for (p of purchases) {
            alert(p.itemId);
            VerifyOnBackendAndGrantEntitlement(p.itemId, p.purchaseToken);
        }
    } catch (error) {
        console.error("Failed to get service:", error.message);
        return;
    }
}

export async function DigitalGoodsGetDetails() {
    try {
        GetService();
        const details = await service.getDetails(["SCCPWATestAppSubscription1", "Coins", "RemoveAds"]);
        for (item of details) {
            alert(item.itemId);
            alert(item.title);
            alert(item.description);
        }
        return "dg!";
    } catch (error) {
        console.error("Failed to get service:", error.message);
        return "dg error";
    }
}

// Code to support purchase of 'SCCPWATestAppSubscription1' subscription

var ameatureTitle = "Amateur";
var ameatureMessage = "You are an amateur! Step up your game!";
var proTitle = "Pro";
var proMessage = "You are a pro! Incredible! Undeniable! Amazing!";
var pro = false;

export function GetStatus()
{
    if(pro)
    {
        return proTitle;
    }
    return ameatureTitle;
}

export function GetStatusMessage()
{
    if(pro)
    {
        return proMessage;
    }
    return ameatureMessage;
}

export function BuyPro()
{
    alert("buying pro");
    DigitalGoodsPurchase("SCCPWATestAppSubscription1");
}

// Code to support purchase of 'Coins' consumable

var poorTitle = "You are Coinless...";
var poorMessage = "You have no coins to use! Get some!";
var richTitle = "You've got coins";
var richMessage = "Look at you, moneybags! Use your coins!";
var coin = false;

export function GetCoin()
{
    if(coin)
    {
        return richTitle;
    }
    return poorTitle;
}

export function GetCoinMessage()
{
    if(coin)
    {
        return richMessage;
    }
    return poorMessage;
}

export function BuyCoins()
{
    alert("buying coins");
    DigitalGoodsPurchase("Coins");
}

export function UseCoins()
{
    alert("using coins");
}

// Code to support purchase of 'RemoveAds' durable

var adTitle = "BANNER AD BANNER AD BANNER AD";
var adMessage = "Hate this annoying ad? Remove it!";
var noAdTitle = "";
var noAdMessage = "Thanks for removing that annoying ad! So much better :)";
var ads = true;

export function GetAd()
{
    if(ads)
    {
        return adTitle;
    }
    return noAdTitle;
}

export function GetAdMessage()
{
    if(ads)
    {
        return adMessage;
    }
    return noAdMessage;
}

export function RemoveAds()
{
    alert("Remove Ads");
    DigitalGoodsPurchase("RemoveAds");
}