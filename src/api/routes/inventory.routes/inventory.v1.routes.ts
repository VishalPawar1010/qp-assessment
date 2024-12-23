import express = require("express");

import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../../controllers/inventory.controller";

import { isAuthorized } from "../../../middlewares/isAuthorized";

const inventoryRouter = express.Router();

inventoryRouter.get("/", getInventory);
inventoryRouter.post("/", isAuthorized, createInventory);
inventoryRouter.patch("/:inventory_id", isAuthorized, updateInventory);
inventoryRouter.delete("/:inventory_id", isAuthorized, deleteInventory);

export { inventoryRouter };
