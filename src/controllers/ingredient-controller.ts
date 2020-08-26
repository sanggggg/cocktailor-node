import { Controller, Get, Wrapper } from "@overnightjs/core";
import { Request, Response } from "express";
import Cocktail from "../models/cocktail";
import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import Recipe from "../models/recipe";
import Ingredient from "../models/ingredient";
import { FindOptions } from "sequelize/types";


@Controller("ingredient")
export class IngredientController {
  @Get("")
  @Wrapper(asyncHandler)
  async getAll(req: Request, res: Response) {
    const { page, prefix } = req.query;

    const option: FindOptions = {};
 
    if (typeof page === "string" && parseInt(page, 10) && parseInt(page, 10) >= 0) {
      const pageNum = parseInt(page, 10);
      option.offset = pageNum * 10;
      option.limit = 10;
    }

    if (typeof prefix === "string" && prefix) {
      option.where = { name: { [Op.like]: prefix + "%"}};
    }
    option.order = [["id", "ASC"]];

    const data = await Ingredient.findAll(option);

    return res.json(data);
  }

  @Get(":id")
  @Wrapper(asyncHandler)
  async get(req: Request, res: Response) {
    const data = await Ingredient.findByPk(req.params.id, {
      include: [{ model: Recipe, include: [Cocktail] }],
    });

    if (!data) return res.status(404).send("ingredient:notexists");

    return res.status(200).json(data);
  }

  // @Post("")
  // @Wrapper(asyncHandler)
  // async createIngredient(req: Request, res: Response) {
  //   const options = req.body[""];
  // }
}
