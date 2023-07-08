import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
//import { DigitalGoodsPurchase, DigitalGoodsConfirmPurchase, DigitalGoodsGetDetails, changecontent } from "../functions/DigitalGoods.js";

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';

var value = 'TESTING';

export function DigitalGoodsGetDetails() {
    //return value;
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
        return "error :(";
    }
}

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
    <script type="text/javascript">
    function changecontent()
    {
    document.getElementById("spanthingy").innerText = "blue";
    }
    </script>
    </header>
    <body>
    <input type="button" name="test" value="change content" onclick="changecontent();">
    <div class="line-item" appearance="accent">${DigitalGoodsGetDetails()}</div>
    <div style="height:20px"></div>
    <div><span id="spanthingy">initial content</span></div>
    </body>
    `;
  }
}
