import { Controller, Get, Wrapper, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import Cocktail from "../models/cocktail";
import * as asyncHandler from "express-async-handler";
import { Op, literal } from "sequelize";
import Recipe from "../models/recipe";
import Ingredient from "../models/ingredient";
import { FindOptions } from "sequelize/types";

@Controller("cocktail")
export class CocktailController {
  @Post("filter")
  async searchByIngredinets(req: Request, res: Response) {
    /**
     * @swagger
     * /api/cocktail/filter:
     *   post:
     *     tags: [Cocktail]
     *     summary: Query cocktails by ingredients
     *     description: Get cocktails which contains every queried ingredients
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               ingredients:
     *                 type: number
     *                 example:
     *                   - 4
     *                   - 308
     *     responses:
     *       200:
     *         description: Cocktails which contains queried ingredients
     */
    const ingredients: number[] = req.body.ingredients;

    const data = await Cocktail.findAll({
      attributes: [
        "id",
        "name",
        "category",
        "alcoholic",
        "glass",
        "instructions",
        "thumbnail",
      ],
      group: ["id"],
      include: [{ model: Recipe, attributes: [] }],
      having: literal(
        `SUM(CASE WHEN idingredient IN (${ingredients.join(
          ","
        )}) THEN 1 ELSE 0 end)=${ingredients.length}`
      ),
    });

    return res.json(data);
  }

  @Get(":id")
  @Wrapper(asyncHandler)
  async get(req: Request, res: Response) {
    /**
     * @swagger
     * /api/cocktail/{id}:
     *   get:
     *     tags: [Cocktail]
     *     summary: Get cocktail and recipe by cocktail id
     *     description: Get cocktail and recipe by cocktail id
     *     parameters:
     *       - name: id
     *         in: path
     *         type: number
     *         required: true
     *         description: cocktail id
     *     responses:
     *       200:
     *         description: Cocktail and recipe by cocktail id
     *       404:
     *         description: No cocktail matched by cocktail id
     */
    const data = await Cocktail.findByPk(req.params.id, {
      include: [{ model: Recipe, include: [Ingredient] }],
    });

    if (!data) return res.status(404).send("cocktail:notexists");

    return res.status(200).json(data);
  }

  @Get("")
  @Wrapper(asyncHandler)
  async getAll(req: Request, res: Response) {
    /**
     * @swagger
     * /api/cocktail:
     *   get:
     *     tags: [Cocktail]
     *     summary: Get all cocktails by prefix or pagenum
     *     description: Get all cocktails by prefix or pagenum
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
     *         description: Cocktails by prefix or pagenum
     */
    const { page, prefix } = req.query;

    const option: FindOptions = {};

    if (
      typeof page === "string" &&
      parseInt(page, 10) &&
      parseInt(page, 10) >= 0
    ) {
      const pageNum = parseInt(page, 10);
      option.offset = pageNum * 10;
      option.limit = 10;
    }

    if (typeof prefix === "string" && prefix) {
      option.where = { name: { [Op.like]: prefix + "%" } };
    }
    option.order = [["id", "ASC"]];

    const data = await Cocktail.findAll(option);

    return res.json(data);
  }

  // @Post("")
  // @Wrapper(asyncHandler)
  // async createCocktail(req: Request, res: Response) {
  //   const options = req.body[""];

  //   const cocktail = await Cocktail.create(options);

  //   return res.json(cocktail);
  // }
}
