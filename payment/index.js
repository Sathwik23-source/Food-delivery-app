const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(); // Add your Stripe secret key here  
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: parseInt(item.price) * 100, // Ensure integer in paise
      },
      quantity: Number(item.stock) || 1, // Ensure integer and default to 1 if undefined
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success", // Change as per your frontend route
      cancel_url: "http://localhost:3000/cancel",   // Change as per your frontend route
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log("Error creating Stripe session:", error);
    res.status(500).json({ error: error.message }); // Return actual error for debugging
  }
});

app.listen(4242, () => {
  console.log("Server is running on port 4242");
});
