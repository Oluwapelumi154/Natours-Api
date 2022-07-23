const { URL, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

exports.checkOutSession = async (user, tour) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${URL}/success`,
    cancel_url: `${URL}/fail`,
    customer_email: user.email,
    client_reference_id: tour.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: `${tour.summary}`,
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });
  return session;
};
