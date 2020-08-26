import { ChildControllers, Controller, Get, Wrapper } from "@overnightjs/core";
import { CocktailController } from "./cocktail-controller";
import { IngredientController } from "./ingredient-controller";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

@Controller("api")
@ChildControllers([
  new CocktailController(),
  new IngredientController()
])
export default class ApiController {
  @Get("")
  @Wrapper(asyncHandler)
  async index(req: Request, res: Response) {
    return res.status(200).send("Api server version 1");
  }
}
