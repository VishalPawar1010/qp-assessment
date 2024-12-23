import { Request, Response, NextFunction } from "express";
import { responseGenerator } from "common-utils-functionalities";

import { inventoryService } from "../../services/inventory.service";
import { IGetUserAuthInfoRequest } from "../../middlewares/userAuthInterceptor";

export async function getInventory(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = req.user!;

    const inventory = await inventoryService.getInventories(role);
    return res.status(200).json(
      responseGenerator({
        data: inventory,
        message: "Inventory",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function createInventory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const { name, price, quantity } = body as unknown as {
      name: string;
      price: number;
      quantity: number;
    };

    const inventory = await inventoryService.addItemsToInventory({
      name,
      price,
      quantity,
    });
    return res.status(201).json(
      responseGenerator({
        data: inventory,
        message: "Inventory has been added",
        statusCode: 201,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function updateInventory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, params } = req;
    const { name, price, quantity } = body as unknown as {
      name: string;
      price: number;
      quantity: number;
    };

    const { inventory_id } = params as unknown as { inventory_id: string };

    const inventory = await inventoryService.updateInventory({
      name,
      price,
      quantity,
      id: inventory_id,
    });
    return res.status(200).json(
      responseGenerator({
        data: inventory,
        message: "Inventory has been updated",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteInventory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { params } = req;

    const { inventory_id } = params as unknown as { inventory_id: string };

    const inventory = await inventoryService.deleteInventory(inventory_id);

    return res.status(200).json(
      responseGenerator({
        data: inventory,
        message: "Inventory has been deleted",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
}
