import * as bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import * as swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";
import * as morgan from "morgan";
import ApiController from "./controllers/api-controller";

export class CocktailorServer extends Server {
  constructor() {
    super(process.env.NODE_ENV === "development"); // setting showLogs to true
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.setUpControllers();
    this.setUpApiDocs();
  }

  private setUpControllers(): void {
    const apiController = new ApiController();
    super.addControllers([apiController]);
  }

  private setUpApiDocs(): void {
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp("Server listening on port: " + port);
    });
  }
}
