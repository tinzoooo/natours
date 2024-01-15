/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51OVDyALplhujKJE9nPk1yiBMUjRSZktqxfaDYrPMJNH053dsbu7rt0AwjK3E4nbKMoppOo1Irjcg2pgAUcme54sx00MIBvrRfV'
);

export const bookTour = async tourId => {
  try {
    // 1) GET checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credict card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
