import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import adminAuth from "./middleware/adminAuth.js";
import allAuth from "./middleware/allAuth.js";
import adminLogin from "./routers/adminLogin.route.js";
import blogRoute from "./routers/blogs.route.js";
import categoryRoute from "./routers/categories.route.js";
import customerLogin from "./routers/customerLogin.route.js";
import customerRoute from "./routers/customers.route.js";
import deliveryMenRoute from "./routers/deliveryMen.route.js";
import foodRoute from "./routers/foods.route.js";
import manLogin from "./routers/manLogin.route.js";
import messages from "./routers/messages.route.js";
import orderRoute from "./routers/orders.route.js";
import revenueRoute from "./routers/revenue.route.js";
import userRoute from "./routers/users.route.js";
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MESSAGE API
app.use("/api/admin/messages", messages);
app.use("/api/admin/messages/:id", messages);

// ADMIN FOOD API
app.use("/api/admin/foods", foodRoute);
app.use("/api/admin/foods/:id", foodRoute);

// ADMIN CATEGORY API
app.use("/api/admin/categories", categoryRoute);
app.use("/api/admin/categories/:id", categoryRoute);

// ADMIN BLOG API
app.use("/api/admin/blogs", blogRoute);
app.use("/api/admin/blogs/:id", blogRoute);

// USER API
app.use("/api/admin/users", adminAuth, userRoute);
app.use("/api/admin/users/:id", userRoute);

// CUSTOMER API
app.use("/api/admin/customers", customerRoute);
app.use("/api/admin/customers/:id", customerRoute);

// DELIVERY MEN API
app.use("/api/admin/delivery-men", allAuth, deliveryMenRoute);
app.use("/api/admin/delivery-men/:id", deliveryMenRoute);

// ORDER API
app.use("/api/admin/orders", allAuth, orderRoute);
app.use("/api/admin/orders/:id", orderRoute);

// REVENUE API
app.use("/api/admin/revenue", adminAuth, revenueRoute);

// CUSTOMER LOGIN API
app.use("/api/admin/customerlogin", customerLogin);

// DELIVERY MAN LOGIN API
app.use("/api/admin/manlogin", manLogin);

// ADMIN LOGIN API
app.use("/api/admin/adminlogin", adminLogin);

// EXPORT IMAGES
app.use("/default", express.static("uploads/default"));
app.use("/foods", express.static("uploads/foods"));
app.use("/categories", express.static("uploads/categories"));
app.use("/orders", express.static("uploads/orders"));
app.use("/blogs", express.static("uploads/blogs"));
app.use("/users", express.static("uploads/users"));
app.use("/customers", express.static("uploads/customers"));
app.use("/delivery-men", express.static("uploads/delivery-men"));

app.get("/", (req, res) => {
  res.send("<h1>App is running...</h1>");
});

// Router Not Found
app.use((req, res, next) => {
  res.json({
    message: "Router Not Found!",
  });
});

// Server Error
app.use((err, req, res, next) => {
  res.json({
    message: "Something broken!",
  });
});

export default app;
