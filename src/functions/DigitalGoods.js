export async function DigitalGoodsPurchase() {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        alert("getDigitalGoodsService is defined, attempting purchase");
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const items = await service.getDetails(['SCCPWATestAppConsumable3']);
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

export function DigitalGoodsConfirmPurchase() {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        alert("getDigitalGoodsService is defined, confirming purchase");
        const service = window.getDigitalGoodsService('https://store.microsoft.com/billing');
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

var value = 'TESTING';

export function DigitalGoodsGetDetails() {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return "no dg";
    }
    try {
        alert("getDigitalGoodsService is defined, getting details");
        const service = window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const details = digitalGoodsService.getDetails(['SCCPWATestAppSubscription1', 'Coins', 'RemoveAds']);
        for (item of details) {
            alert(p.itemId);
            const priceStr = new Intl.NumberFormat(
                locale,
                {style: 'currency', currency: item.price.currency}
              ).format(item.price.value);
            alert(priceStr);
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

export function changecontent()
{
    alert("IN FUN");
}