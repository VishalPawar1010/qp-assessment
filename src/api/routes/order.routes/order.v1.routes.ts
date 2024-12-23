import express = require("express");

import { placeOrder, getOrders } from "../../controllers/order.controller";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

const orderRouter = express.Router();

orderRouter.post("/", isAuthenticated, placeOrder);
orderRouter.get("/", getOrders);

export { orderRouter };
