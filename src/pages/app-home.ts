import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {DigitalGoodsPurchase, GetDetails, UpdatePurchases, UseCoins} from '../functions/DigitalGoods.js';

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

  @state() service: any;

  @state() productDetails = "";

  // Add the functions I want to call on page render
  connectedCallback(): void {
    super.connectedCallback();
    GetDetails(this.proPrice, this.coinPrice, this.adsPrice, this.productDetails);
    UpdatePurchases(this.pro, this.coin, this.ads);
    this.UpdateTitlesAndMessaged();
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

  async BuyPro()
  {
    await DigitalGoodsPurchase("SCCPWATestAppSubscription1");
    UpdatePurchases(this.pro, this.coin, this.ads);
    this.UpdateTitlesAndMessaged();
  }

  async BuyCoins()
  {
    await DigitalGoodsPurchase("Coins");
    UpdatePurchases(this.pro, this.coin, this.ads);
    this.UpdateTitlesAndMessaged();
  }

  async BuyAds()
  {
    await DigitalGoodsPurchase("RemoveAds");
    UpdatePurchases(this.pro, this.coin, this.ads);
    this.UpdateTitlesAndMessaged();
  }

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
        <button type="button" class="secondary" @click="${() => {UseCoins(); UpdatePurchases(this.pro, this.coin, this.ads); this.UpdateTitlesAndMessaged();}}">Use Coins</button>
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
