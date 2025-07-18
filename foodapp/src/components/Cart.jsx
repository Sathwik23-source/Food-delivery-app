import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";

const stripePromise = loadStripe("pk_test_51Q5VeIDAHKy4PKKmzruXrGg41yIz73R2CDksFIbJP7HMjfIP8RqcsFLhrWAlh1scjzUWwYX5ZDuabDnkE9DfxYD200kFiuziyF");

const Cart = ({ cart }) => {

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: Object.entries(cart).map(([key, item]) => ({
          name: item.name,
          price: item.price,
          quantity: item.stock,
        })),
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log("Stripe checkout error:", result.error.message);
    }
  };

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  return (
    <div>
      <ul>
        {Object.keys(cart).length > 0 ? (
          Object.entries(cart).map(([key, item]) => (
            <li key={key}>
              {item.name} - Rs. {item.price} x {item.stock}
            </li>
          ))
        ) : (
          <h3>No items in cart</h3>
        )}
      </ul>
      {Object.keys(cart).length > 0 && (
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Check out
        </Button>
      )}
    </div>
  );
};

export default Cart;
