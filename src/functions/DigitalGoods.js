// var service;

// export async function GetService()
// {
//     InitializeService();
//     return service;
// }

// async function InitializeService()
// {
//     var counter = 0;
//     do {
//         alert("entering loop");
//         counter++;
//         if (service !== undefined)
//         {
//             alert("service defined");
//             return;
//         }
//         if (window.getDigitalGoodsService === undefined) {
//             // Digital Goods API is not supported in this context.
//             alert("getDigitalGoodsService is undefined");
//             return;
//         }
//         try {
//             alert("getDigitalGoodsService is defined, trying to get service");
//             service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
//         } catch (error) {
//             console.error("Failed to get service:", error.message);
//         }
//     } while (service === undefined && counter < 5)
// }
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

export async function DigitalGoodsConfirmPurchase(token) {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return false;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const purchases = await service.listPurchases();
        for (const p of purchases) {
            if(p.itemId === token){
                return true;
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
        return false;
    }
}

export async function DigitalGoodsListAllPurchases() {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return false;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const purchases = await service.listPurchases();
        for (const p of purchases) {
            alert(p.itemId);
        }
    } catch (error) {
        console.error("Error:", error.message);
        return false;
    }
}

export async function DigitalGoodsGetDetails() {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const details = await service.getDetails(["SCCPWATestAppSubscription1", "Coins", "RemoveAds"]);
        for (const item of details) {
            alert(item.itemId);
            alert(item.title);
            alert(item.description);
            alert(item.price.currency);
            alert(item.price.value);
        }
        return "dg!";
    } catch (error) {
        console.error("Error:", error.message);
        return "dg error";
    }
}

export async function DigitalGoodsGetPrices(id) {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const details = await service.getDetails(["SCCPWATestAppSubscription1", "Coins", "RemoveAds"]);
        for (const item of details) {
            if(item.itemId === id)
            {
                return "" + item.price.value + " " + item.price.currency;
            }
        }
        return "dg!";
    } catch (error) {
        console.error("Error:", error.message);
        return "dg error";
    }
}

// Code to support purchase of 'SCCPWATestAppSubscription1' subscription

var ameatureTitle = "Amateur";
var ameatureMessage = "You are an amateur! Step up your game!";
var proTitle = "Pro";
var proMessage = "You are a pro! Incredible! Undeniable! Amazing!";
var proPrice = await DigitalGoodsGetPrices("SCCPWATestAppSubscription1");
var pro = await DigitalGoodsConfirmPurchase("SCCPWATestAppSubscription1");

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

export function GetProPrice()
{
    return proPrice;
}

export async function BuyPro()
{
    await DigitalGoodsPurchase("SCCPWATestAppSubscription1");
    window.location.reload();
}

// Code to support purchase of 'Coins' consumable

var poorTitle = "You are Coinless...";
var poorMessage = "You have no coins to use! Get some!";
var richTitle = "You've got coins";
var richMessage = "Look at you, moneybags! Use your coins!";
var coinPrice = await DigitalGoodsGetPrices("Coins");
var coin = await DigitalGoodsConfirmPurchase("Coins");

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

export function GetCoinPrice()
{
    return coinPrice;
}

export async function BuyCoins()
{
    await DigitalGoodsPurchase("Coins");
    window.location.reload();
}

export async function UseCoins()
{
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const purchases = await service.listPurchases();
        for (const p of purchases) {
            if(p.itemId === "Coins")
            {
                alert(service.consume("9P7WL3ZK0C6K"));
                alert("PLUS FIVE COINS");
                window.location.reload();
                return;
            }
        }
        alert("NO COINS TO USE");
    } catch (error) {
        console.error("Error:", error.message);
        return "dg error";
    }
}

// Code to support purchase of 'RemoveAds' durable

var adTitle = "BANNER AD BANNER AD BANNER AD";
var adMessage = "Hate this annoying ad? Remove it!";
var noAdTitle = "";
var noAdMessage = "Thanks for removing that annoying ad! So much better :)";
var adsPrice = await DigitalGoodsGetPrices("RemoveAds");
var ads = await DigitalGoodsConfirmPurchase("RemoveAds");

export function GetAd()
{
    if(!ads)
    {
        return adTitle;
    }
    return noAdTitle;
}

export function GetAdMessage()
{
    if(!ads)
    {
        return adMessage;
    }
    return noAdMessage;
}

export function GetAdPrice()
{
    return adsPrice;
}

export async function RemoveAds()
{
    await DigitalGoodsPurchase("RemoveAds");
    window.location.reload();
}
