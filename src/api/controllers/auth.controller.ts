import { Request, Response, NextFunction } from "express";
import { responseGenerator } from "common-utils-functionalities";

import { authService } from "../../services/auth.service";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { email, password, firstName, lastName, isAdmin } = body;

    const userCreated = await authService.register({
      email,
      password,
      firstName,
      lastName,
      isAdmin,
    });
    return res.status(201).json(
      responseGenerator({
        data: userCreated,
        message: "User signed up successfully",
        statusCode: 201,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { email, password } = body;

    const userCreated = await authService.login(email, password);
    return res.status(200).json(
      responseGenerator({
        data: userCreated,
        message: "User signed in successfully",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
}
