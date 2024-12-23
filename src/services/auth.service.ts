import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotAuthorizedError,
} from "common-utils-functionalities";

import { UserModel } from "../models/User";
import { config } from "../config";

interface User {
  email: string;
  password: string;
  firstName: string;
  isAdmin: boolean;
  lastName?: string;
}

type Token = Omit<User, "password" | "firstName" | "lastName" | "isAdmin"> & {
  id: string;
};

class AuthService {
  private userModel: typeof UserModel;
  private saltRounds = 10;

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  async register(user: User) {
    try {
      const { email, firstName, isAdmin, password, lastName } = user;

      const isUserAlreadyPresent = await this.userModel.findOne({
        where: { email },
      });

      if (isUserAlreadyPresent) {
        throw new BadRequestError("User already");
      }

      const passwordHashed = this.hashPassword(password);

      const userCreated = await this.userModel.create({
        email,
        lastName,
        firstName,
        password: passwordHashed,
        role: isAdmin ? "ADMIN" : "USER",
      });

      return userCreated;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotAuthorizedError("Email or password is wrong");
      }

      const isPasswordCorrect = this.verifyPassword(
        password,
        user.dataValues.password
      );

      if (!isPasswordCorrect) {
        throw new NotAuthorizedError("Email or password is wrong");
      }

      const _ = {
        email: user.dataValues.email,
        role: user.dataValues.role,
        id: user.dataValues.id,
      };

      const token = await this.generateJwtToken(_);
      return token;
    } catch (error) {
      throw error;
    }
  }

  hashPassword(plainPassword: string) {
    try {
      const salt = bcrypt.genSaltSync(this.saltRounds);
      const hashedPassword = bcrypt.hashSync(plainPassword, salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  verifyPassword(plainPassword: string, hashedPassword: string) {
    try {
      const isPasswordCorrect = bcrypt.compareSync(
        plainPassword,
        hashedPassword
      );
      return isPasswordCorrect;
    } catch (error) {
      throw error;
    }
  }

  async generateJwtToken(user: Token) {
    try {
      return jwt.sign(user, config.get("jwt_key"), {
        expiresIn: config.get("jwt_expire"),
      });
    } catch (error) {
      throw error;
    }
  }

  async verifyJwtToken(token: string) {
    try {
      const user = jwt.verify(token, config.get("jwt_key"));
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const authService: AuthService = new AuthService(UserModel);
