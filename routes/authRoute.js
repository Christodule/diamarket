/*import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;*/
import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} from "../controllers/authController.js";
import {
  requireSignIn,
  isAdmin,
  isFleetAdmin,
  isUser
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerController);

// User login
router.post("/login", loginController);

// Forgot password
router.post("/forgot-password", forgotPasswordController);

// Test route (for testing protected routes)
router.get("/test", requireSignIn, testController);

// Update user profile
router.put("/update-profile", requireSignIn, updateProfileController);

// Get user orders (for users)
router.get("/orders", requireSignIn, isUser, getOrdersController);

// Get all orders (for admin)
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Update order status (for admin and fleetadmin)
router.put("/order-status/:orderId", requireSignIn, isFleetAdmin, orderStatusController);

export default router;

