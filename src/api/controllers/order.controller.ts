import { Response, NextFunction } from "express";
import { responseGenerator } from "common-utils-functionalities";

import { orderService } from "../../services/order.service";
import { IGetUserAuthInfoRequest } from "../../middlewares/userAuthInterceptor";

export async function placeOrder(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, user } = req;
    const { id: userId } = user;
    const { items } = body as unknown as { items: string[] };

    const order = await orderService.placeOrder({ items, userId });

    if (order?.length === 0) {
      return res.status(400).json(
        responseGenerator({
          data: order,
          message: "Inventory out of stock",
          statusCode: 400,
        })
      );
    }

    return res.status(201).json(
      responseGenerator({
        data: order,
        message: "Order has been placed",
        statusCode: 201,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function getOrders(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;

    const { id: userId } = user;

    const order = await orderService.getOrders(userId);
    return res.status(200).json(
      responseGenerator({
        data: order,
        message: "Order all orders placed by user",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
}
