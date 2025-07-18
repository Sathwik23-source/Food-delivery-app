# Food Delivery App 🚀

A full-stack food delivery application built with **React**, **Firebase**, **Stripe**, and **Node.js**.

---

## ✨ **Features**

✅ Browse food menu from Firebase  
✅ Add items to cart  
✅ Manage cart quantities  
✅ Checkout using Stripe Payment Gateway  
✅ Admin dashboard to add, edit, or delete food items

---

## 🗂️ **Project Structure**



Food-delivery-app/
|
├── foodapp/ # React app with Firebase integration
│ └── src/
│ └── package.json
│
├── payment/ # Express.js + Stripe server
│ └── index.js
│ └── package.json

└── README.md



2. Setup Backend
bash
Copy
Edit
cd payment
npm install
🔑 Environment Variables: Create .env in backend/ and add:

ini
Copy
Edit
STRIPE_SECRET_KEY=your_stripe_secret_key_here
Start backend server:

bash
Copy
Edit
node index.js
3. Setup Frontend
bash
Copy
Edit
cd ../foodapp
npm install
npm start
💳 Stripe Integration
Stripe keys are stored securely in .env.

The backend handles session creation with Stripe Checkout.

On successful payment, Stripe redirects to a success page.

🔐 Environment Variables
Both frontend and backend require Firebase and Stripe configurations in their respective .env files (not pushed to GitHub for security).

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is licensed under the MIT License.

👤 Author
Sathwik Gasikanti












