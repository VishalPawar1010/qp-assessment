import express = require("express");

import { inventoryRouter } from "./inventory.routes/inventory.v1.routes";
import { userRouter } from "./users.routes/users.v1.routes";
import { orderRouter } from "./order.routes/order.v1.routes";

import { isAuthenticated } from "../../middlewares/isAuthenticated";

const mainRouter = express.Router();

mainRouter.use("/api/v1/inventories", isAuthenticated, inventoryRouter);
mainRouter.use("/api/v1/users", userRouter);
mainRouter.use("/api/v1/orders", isAuthenticated, orderRouter);

export { mainRouter };
