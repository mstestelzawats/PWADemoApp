import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {DigitalGoodsPurchase, GetDetails, UpdatePurchases, UseCoins, WinrtCalls} from '../functions/DigitalGoods.js';

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
  private static poorMessage = "You have no coins to use! Get some to add to your pile!";
  private static richTitle = "You've got coins";
  private static richMessage = "Look at you, moneybags! Add those coins to your pile!";
  private static adTitle = "BANNER AD BANNER AD BANNER AD";
  private static adMessage = "Hate this annoying ad? Remove it!";
  private static noAdTitle = "";
  private static noAdMessage = "Thanks for removing that annoying ad! So much better :)";

  @state() pro = false;
  @state() coin = false;
  @state() ads = false;;

  @state() proTitle = "";
  @state() proMessage = "";
  @state() coinTitle = "";
  @state() coinMessage = "";
  @state() adsTitle = "";
  @state() adsMessage = "";

  @state() productDetails: string = "";

  @state() coinPile = 0;

  // Add the functions I want to call on page render
  async connectedCallback(){
    super.connectedCallback();
    this.productDetails = await GetDetails(); //this.proPrice, this.coinPrice, this.adsPrice, this.productDetails
    const vals = await UpdatePurchases();
    if(vals)
    {
      this.pro = vals[0];
      this.coin = vals[1];
      this.ads = vals[2];
    }
    this.UpdateTitlesAndMessages();
  }

  UpdateTitlesAndMessages(){
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
    const vals = await UpdatePurchases();
    if(vals)
    {
      this.pro = vals[0];
      this.coin = vals[1];
      this.ads = vals[2];
    }
    this.UpdateTitlesAndMessages();
  }

  async BuyCoins()
  {
    await DigitalGoodsPurchase("Coins");
    const vals = await UpdatePurchases();
    if(vals)
    {
      this.pro = vals[0];
      this.coin = vals[1];
      this.ads = vals[2];
    }
    this.UpdateTitlesAndMessages();
  }

  async BuyAds()
  {
    await DigitalGoodsPurchase("RemoveAds");
    const vals = await UpdatePurchases();
    if(vals)
    {
      this.pro = vals[0];
      this.coin = vals[1];
      this.ads = vals[2];
    }
    this.UpdateTitlesAndMessages();
  }

  async MakeWinrtCalls()
  {
    await WinrtCalls();
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
        font-size: -35px, 20px;
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
        text-align: center;
        margin: 15px;
        font-size: 70px;
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
        <p>Welcome to the coins app! Buy coins and add them to your pile! Become a pro! Get rid of the pesky ads!</p>
      </div>
    </header>

    <div class="coinpile">COIN PILE: ${this.coinPile}</div>

    <body>
    <div class="parent">
      <h2>${this.proTitle}</h2>
      <div class="item">
        <p>${this.proMessage}</p>
      </div>
      <div class="item">
        <button type="button" class="primary" @click="${() => {this.BuyPro();}}">Buy Pro</button>
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
        <button type="button" class="secondary" @click="${async () => {
          if(await UseCoins()){
            this.coin = false;
            this.coinPile = this.coinPile + 5;
          }
          this.UpdateTitlesAndMessages();
        }}">Add coins to pile</button>
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
    </div>
    <p></p>

    <div class="parent">
      <div class="item">
        <p>Testing</p>
      </div>
      <div class="item">
        <button type="button" class="primary" @click="${() => {this.MakeWinrtCalls();}}">winrtCalls</button>
      </div>
    </div>
    <p></p>
    </body>
    `;
  }
}
