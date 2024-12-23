import { Op, Transaction } from "sequelize";

import { BadRequestError } from "common-utils-functionalities";
import { InventoryModel } from "../models/Inventory";

interface Inventory {
  name: string;
  price: number;
  quantity: number;
}

interface InventoryUpdate extends Inventory {
  id: string;
}

export class InventoryService {
  private inventoryModel: typeof InventoryModel;

  constructor(inventoryModel: typeof InventoryModel) {
    this.inventoryModel = inventoryModel;
  }

  async getInventories(role: "ADMIN" | "USER") {
    try {
      let where = {};
      if (role === "USER") {
        /**
         * For user role, we will show only available inventory items
         */
        where = {
          quantity: {
            [Op.gt]: 0,
          },
        };
      }
      const inventory = await this.inventoryModel.findAll({ where });
      return inventory;
    } catch (error) {
      throw error;
    }
  }

  async getMultipleInventories(items: string[]) {
    try {
      const inventory = await this.inventoryModel.findAll({
        where: { id: items, quantity: { [Op.gt]: 0 } },
      });
      return inventory;
    } catch (error) {
      throw error;
    }
  }

  async updateInventoryQuantity(itemId: string, transaction: Transaction) {
    try {
      const quantityUpdated = await this.inventoryModel.decrement(
        { quantity: +1 },
        { where: { id: itemId }, transaction }
      );
      return quantityUpdated;
    } catch (error) {
      throw error;
    }
  }

  async addItemsToInventory(inventory: Inventory) {
    try {
      const { name, price, quantity } = inventory;
      const inventoryAdded = await this.inventoryModel.create({
        name,
        price,
        quantity,
      });
      return inventoryAdded;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  async updateInventory(inventory: InventoryUpdate) {
    try {
      const { name, price, quantity, id } = inventory;
      const inventoryUpdated = await this.inventoryModel.findByPk(id);
      await inventoryUpdated?.update({ name, price, quantity });
      await inventoryUpdated?.save();
      return inventoryUpdated;
    } catch (error) {
      throw error;
    }
  }

  async deleteInventory(id: string) {
    try {
      const inventoryDeleted = await this.inventoryModel.destroy({
        where: { id },
      });
      return inventoryDeleted;
    } catch (error) {
      throw error;
    }
  }
}

export const inventoryService: InventoryService = new InventoryService(
  InventoryModel
);
