import { sequelize } from "../setup/database";
import { InventoryModel } from "../models/Inventory";
import { OrderModel } from "../models/Order";
import { OrderItemsModel } from "../models/OrderItems";
import { InventoryService } from "./inventory.service";

class OrderService {
  private orderModel: typeof OrderModel;
  private orderItemsModel: typeof OrderItemsModel;
  private inventoryService: InventoryService;
  constructor(
    orderModel: typeof OrderModel,
    orderItemsModel: typeof OrderItemsModel,
    inventoryService: InventoryService
  ) {
    this.orderModel = orderModel;
    this.inventoryService = inventoryService;
    this.orderItemsModel = orderItemsModel;
  }

  async placeOrder(inventory: { items: string[]; userId: string }) {
    try {
      const { items, userId } = inventory;
      const transaction = await sequelize.transaction();
      try {
        const availableInventories =
          await this.inventoryService.getMultipleInventories(items);
        console.log("Available Inventories:", availableInventories);

        if (availableInventories.length === 0) {
          console.log("No available inventories for items:", items);
          return [];
        }

        const order = await this.orderModel.create(
          {
            userId,
          },
          { transaction }
        );

        const orderId = order.dataValues.id;

        const orderItems = availableInventories.map((availableInventory) => {
          return {
            orderId,
            itemId: availableInventory.dataValues.id,
          };
        });

        console.log("Order Items to be created:", orderItems);

        for await (const item of orderItems) {
          await this.inventoryService.updateInventoryQuantity(
            item.itemId,
            transaction
          );
        }

        const orderCreated = await this.orderItemsModel.bulkCreate(orderItems, {
          transaction,
        });
        console.log("Order Created:", orderCreated);

        await transaction.commit();
        return orderCreated;
      } catch (error) {
        await transaction.rollback();
        console.error("Transaction Error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in placeOrder:", error);
      throw error;
    }
  }

  async getOrders(userId: string) {
    try {
      const orders = await this.orderModel.findAll({
        where: { userId },
        include: [{ model: OrderItemsModel, include: [InventoryModel] }],
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }
}

export const orderService: OrderService = new OrderService(
  OrderModel,
  OrderItemsModel,
  new InventoryService(InventoryModel)
);
