import { MONGO_URI, PORT, NODE_ENV } from "@config/env";
// Dependencies
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { useExpressServer } from "routing-controllers";

// Database
import MongoDB from "@providers/mongoDB.provider";

// Base Error Class
import BaseError from "@/errors/BaseError";
import NotFoundError from "@/errors/NotFoundError";

export class App {
  public app: express.Application;
  public env: string | undefined;
  public port: string | number | undefined;
  private client: MongoDB;

  constructor() {
    this.app = express();
    this.env = NODE_ENV;
    this.port = PORT;
    this.client = new MongoDB(MONGO_URI || "");

    this.initializeDB();
    this.initializeMiddleWare();
    this.initializeRoutes();
    this.notListedRoutesHandler();
    this.initializeErrorHandler();
  }

  private async initializeDB() {
    await this.client.connect();
  }
  private initializeRoutes() {
    useExpressServer(this.app, {
      controllers: [
        __dirname + "/controllers/**/*.controller.ts",
        __dirname + "/controllers/**/*.controller.js",
      ],
      defaultErrorHandler: false,
    });
  }
  private initializeMiddleWare() {
    this.app.use(morgan("tiny"));
  }
  private notListedRoutesHandler() {
    this.app.all("*", (req, res) => {
      if (!res.headersSent) throw new NotFoundError("Route Not Found");
    });
  }

  private initializeErrorHandler() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        // Checking if Error is Instance Of Base error then we can send customize message
        if (err instanceof BaseError) {
          return res.status(err.statusCode).json({
            message: err.message,
          });
        }

        return res.status(503).send("Service Unavailable");
      }
    );
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(
        `:: [EXPRESS] Server Stared :: Environment :: ${this.env?.toUpperCase()} :: PORT :: ${
          this.port
        }`
      );
    });
  }

  public getApp() {
    return this.app;
  }
}
