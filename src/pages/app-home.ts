import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { DigitalGoodsGetDetails, GetStatus, GetStatusMessage, GetCoin, GetCoinMessage, GetAd, GetAdMessage, changecontent } from "../functions/DigitalGoods.js";

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';

  static get styles() {
    return [
      styles,
      css`
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
    <style>
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
    </style>
    <div class="header">
    <h1>COINS!!</h1>
    </div>
    <div class="subheader">
    <p>Welcome to the coins app! Buy coins, use coins, become a pro, and get rid of the pesky ads!</p>
    </div>
    </header>

    <body>
    <style>
    div.ad{
      text-align: center;
      background-color: red;
      color: yellow;
      font-size: 80px;
      margin: -40px 0px;
    }
    div.item{
      margin: 0px 15px;
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
    </style>
    <div class="item">
    <h2>${GetStatus()}</h2>
    <p>${GetStatusMessage()}</p>
    <button type="button" class="primary">Buy Pro</button>
    <h2>${GetCoin()}</h2>
    <p>${GetCoinMessage()}</p>
    <button type="button" class="primary">Buy Coins</button>
    <button type="button" class="secondary">Use Coins</button>
    <h2>Products to Buy:</h2>
    <fluent-button class="line-item" @click="${() => {changecontent();}}" appearance="accent">experiment</fluent-button>
    <fluent-accent class="line-item" appearance="accent">${DigitalGoodsGetDetails()}</fluent-button>
    </div>
    <div class="ad">
    <p>${GetAd()}</p>
    </div>
    <p>${GetAdMessage()}</p>
    <button type="button" class="primary">Remove Ads</button>
    <p></p>
    </body>
    `;
  }
}
