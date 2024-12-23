import express, { Application, Request, Response } from "express";
import { errorHandler, responseGenerator } from "common-utils-functionalities";
import morgan from "morgan";

import { mainRouter } from "../api/routes";

export function expressLoader(app: Application) {
  try {
    app.use(express.json());
    app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );

    /**
     * *******************
     * HEALTH BLOCK STARTS
     * *******************
     */
    app.get(["/_livez", "/_healthz", "/_readyz"], (_req, res) => {
      return res.status(200).json({ ok: "ok" });
    });

    app.use(["/hi", "/hello"], (_req: Request, res: Response) => {
      return res.status(200).json(
        responseGenerator({
          data: "Welcome Grocery Ordering Application",
        })
      );
    });
    /**
     * *****************
     * HEALTH BLOCK ENDS
     * *****************
     */

    app.use(mainRouter);

    app.use(errorHandler);
  } catch (error) {
    throw error;
  }
}
