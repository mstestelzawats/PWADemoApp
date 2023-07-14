import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  private static ameatureTitle = "Amateur";
  private static ameatureMessage = "You are an amateur! Step up your game and get the Pro Subscription!";
  private static proTitle = "Pro";
  private static proMessage = "You are subscribed as a pro! Incredible! Undeniable! Amazing!";
  private static poorTitle = "You are Coinless...";
  private static poorMessage = "You have no coins to use! Get some!";
  private static richTitle = "You've got coins";
  private static richMessage = "Look at you, moneybags! Use your coins!";
  private static adTitle = "BANNER AD BANNER AD BANNER AD";
  private static adMessage = "Hate this annoying ad? Remove it!";
  private static noAdTitle = "";
  private static noAdMessage = "Thanks for removing that annoying ad! So much better :)";

  @state() pro = false;
  @state() coin = false;
  @state() ads = false;;

  @state() proPrice = "PRICE";
  @state() coinPrice = "PRICE";
  @state() adsPrice = "PRICE";

  @state() proTitle = "TITLE";
  @state() proMessage = "MESSAGE";
  @state() coinTitle = "TITLE";
  @state() coinMessage = "MESSAGE";
  @state() adsTitle = "TITLE";
  @state() adsMessage = "MESSAGE";

  @state() productDetails = "";

  // Add the functions I want to call on page render
  connectedCallback(): void {
    super.connectedCallback();
    this.GetDetails();
    this.UpdatePurchases();
    this.UpdateTitlesAndMessaged();
  }

  async GetDetails() {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        const service = await window.getDigitalGoodsService("https://store.microsoft.com/billing");
        const details = await service.getDetails(["SCCPWATestAppSubscription1", "Coins", "RemoveAds"]);
        for (const item of details) {
            if(item.itemId === "SCCPWATestAppSubscription1"){
                this.proPrice = "" + item.price.value + " " + item.price.currency + " " + item.subscriptionPeriod;
            }
            if(item.itemId === "Coins"){
              this.coinPrice = "" + item.price.value + " " + item.price.currency;
            }
            if(item.itemId === "RemoveAds"){
              this.adsPrice = "" + item.price.value + " " + item.price.currency;
            }
            this.productDetails = this.productDetails + item.title + ": " + item.description + "\n";
        }
        return;
    } catch (error) {
        console.error("Error:", error.message);
        return;
    }
  }

  async UpdatePurchases() {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        const service = await window.getDigitalGoodsService("https://store.microsoft.com/billing");
        const purchases = await service.listPurchases();
        for (const item of purchases) {
          if(item.itemId === "SCCPWATestAppSubscription1"){
            this.pro = true;
          }
          if(item.itemId === "Coins"){
            this.coin = true;
          }
          if(item.itemId === "RemoveAds"){
            this.ads = true;
          }
          return;
        }
    } catch (error) {
        console.error("Error:", error.message);
        return;
    }
  }

  UpdateTitlesAndMessaged(){
    if(this.pro){
        this.proTitle = AppHome.proTitle;
        this.proMessage = AppHome.proMessage;
    }
    else{
      this.proTitle = AppHome.ameatureTitle;
      this.proMessage = AppHome.ameatureMessage;
    }

    if(this.coin){
      this.coinTitle = AppHome.richTitle;
      this.coinMessage = AppHome.richMessage;
    }
    else{
      this.coinTitle = AppHome.poorTitle;
      this.coinMessage = AppHome.poorMessage;
    }

    if(this.ads){
      this.adsTitle = AppHome.noAdTitle;
      this.adsMessage = AppHome.noAdMessage;
    }
    else{
      this.adsTitle = AppHome.adTitle;
      this.adsMessage = AppHome.adMessage;
    }
  }

  async DigitalGoodsPurchase(IAPToken) {
    if (window.getDigitalGoodsService === undefined) {
        // Digital Goods API is not supported in this context.
        alert("getDigitalGoodsService is undefined");
        return;
    }
    try {
        const service = await window.getDigitalGoodsService('https://store.microsoft.com/billing');
        const items = await service.getDetails([IAPToken]);
        const request = new PaymentRequest([{
            supportedMethods: "https://store.microsoft.com/billing",
            data: { itemId: items[0].itemId },
        }]);
        const response = await request.show();
        alert(items[0].title + " purchase successful!");
    } catch (error) {
        console.error("Error:", error.message);
        return;
    }
  }

  async BuyPro()
  {
    await this.DigitalGoodsPurchase("SCCPWATestAppSubscription1");
    this.UpdatePurchases();
    this.UpdateTitlesAndMessaged();
  }

  async BuyCoins()
  {
    await this.DigitalGoodsPurchase("Coins");
    this.UpdatePurchases();
    this.UpdateTitlesAndMessaged();
  }

  async BuyAds()
  {
    await this.DigitalGoodsPurchase("RemoveAds");
    this.UpdatePurchases();
    this.UpdateTitlesAndMessaged();
  }

  async UseCoins()
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
                service.consume("9P7WL3ZK0C6K");
                alert("PLUS FIVE COINS");
                this.UpdatePurchases();
                this.UpdateTitlesAndMessaged();
                return;
            }
        }
        alert("NO COINS TO USE");
        return;
    } catch (error) {
        alert("Error while using coins");
        console.error("Error:", error.message);
        return;
    }
  }

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
  static get styles() {
    return [
      styles,
      css`
      div.header{
        text-align: center;
        font-size: 50px;
        margin: -20px;
        padding: 0px;
        background-color: gold;
      }
      div.subheader{
        text-align: center;
        font-size: 20px;
        margin: 0px;
      }

      div.ad{
        text-align: center;
        background-color: red;
        color: yellow;
        font-size: 80px;
        margin: -40px 0px;
      }
      div.item{
        display: inline-block;
      }
      div.parent{
        margin: 0px 15px;
        white-space: nowrap;
      }
      div.coinpile{
        margin: -20px 15px;
        font-size: 50px;
      }
      button.primary{
        background-color: dodgerblue;
        font-size: 20px;
        border-radius: 15px;
        -moz-border-radius: 15px
      }
      button.secondary{
        background-color: gray;
        font-size: 20px;
        border-radius: 15px;
        -moz-border-radius: 15px
      }

      #welcomeBar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      #welcomeCard,
      #infoCard {
        padding: 18px;
        padding-top: 0px;
      }

      sl-card::part(footer) {
        display: flex;
        justify-content: flex-end;
      }

      @media(min-width: 750px) {
        sl-card {
          width: 70vw;
        }
      }


      @media (horizontal-viewport-segments: 2) {
        #welcomeBar {
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }

        #welcomeCard {
          margin-right: 64px;
        }
      }
    `];
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    console.log('This is your home page');
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }

  render() {
    return html`
    <header>
    <div class="header">
    <h1>COINS!!</h1>
    </div>
    <div class="subheader">
    <p>Welcome to the coins app! Buy coins, use coins, become a pro, and get rid of the pesky ads!</p>
    </div>
    </header>

    <body>
    <div class="parent">
      <h2>${this.proTitle}</h2>
      <div class="item">
        <p>${this.proMessage}</p>
      </div>
      <div class="item">
        <button type="button" class="primary" @click="${() => {this.BuyPro();}}">Buy Pro</button>
      </div>
      <div class="item">
        <p>${this.proPrice}</p>
      </div>
    </div>

    <div class="parent">
      <h2>${this.coinTitle}</h2>
      <div class="item">
        <p>${this.coinMessage}</p>
      </div>
      <div class="item">
        <button type="button" class="primary" @click="${() => {this.BuyCoins();}}">Buy Coins</button>
      </div>
      <div class="item">
        <p>${this.coinPrice}</p>
      </div>
      <div class="item">
        <button type="button" class="secondary" @click="${() => {this.UseCoins();}}">Use Coins</button>
      </div>
    </div>

    <div class="parent">
      <h2>Products to Buy:</h2>
      <div class="item">
        <span style="white-space: pre-line">${this.productDetails}</span>
      </div>
    </div>

    <div class="ad">
      <p>${this.adsTitle}</p>
    </div>

    <div class="parent">
      <div class="item">
        <p>${this.adsMessage}</p>
      </div>
      <div class="item">
        <button type="button" class="primary" @click="${() => {this.BuyAds();}}">Remove Ads</button>
      </div>
      <div class="item">
        <p>${this.adsPrice}</p>
      </div>
    </div>
    <p></p>
    </body>
    `;
  }
}
