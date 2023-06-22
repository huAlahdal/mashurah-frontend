const src = 'https://bsf.gateway.mastercard.com/checkout/version/56/checkout.js';
const dataerror = 'errorCallback';
const datacancel = 'cancelCallback';
const datacomplete = 'completeCallback';

function errorCallback(error) {
  console.log(error);
}
function cancelCallback() {
  console.log('Payment Canceled');
}

function completeCallback() {
  window.angularComponentReference.zone.run(() => {
    window.angularComponentReference.loadAngularFunction();
  });
}

export function pay(sessionId) {
  console.log(sessionId);
  Checkout.configure({
    session: {
      id: sessionId,
    },
    merchant: '550100063150',
    order: {
      currency: 'SAR',
      description: 'Ordered goods',
    },
    interaction: {
      operation: 'PURCHASE',
      merchant: {
        name: 'STEADY PACE TRADING COMPANY',
        address: {
          line1: '200 Sample St',
          line2: '1234 Example Town',
        },
      },
    },
  });
  Checkout.showLightbox();
}
