import { Controller, Get, Wrapper } from "@overnightjs/core";
import { Request, Response } from "express";
import Cocktail from "../models/cocktail";
import * as asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import Recipe from "../models/recipe";
import Ingredient from "../models/ingredient";
import { FindOptions } from "sequelize/types";


@Controller("ingredient")
export class IngredientController {
  @Get("")
  @Wrapper(asyncHandler)
  async getAll(req: Request, res: Response) {
    /**
     * @swagger
     * /api/ingredient:
     *   get:
     *     tags: [Ingredient]
     *     summary: Get all ingredients by prefix or pagenum
     *     description: Get all ingredients by prefix or pagenum
     *     parameters:
     *       - name: page
     *         in: query
     *         type: number
     *         required: false
     *         description: page of result
     *       - name: prefix
     *         in: query
     *         type: string
     *         required: false
     *         description: prefix of result
     *     responses:
     *       200:
     *         description: Ingredients by prefix or pagenum
     */
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
    /**
     * @swagger
     * /api/ingredient/{id}:
     *   get:
     *     tags: [Ingredient]
     *     summary: Get ingredient and recipe by ingredient id
     *     description: Get ingredient and recipe by ingredient id
     *     parameters:
     *       - name: id
     *         in: path
     *         type: number
     *         required: true
     *         description: ingredient id
     *     responses:
     *       200:
     *         description: Ingredient and recipe by ingredient id
     *       404:
     *         description: No ingredient matched by ingredient id
     */
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
