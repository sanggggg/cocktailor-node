"use strict";
import { Sequelize } from "sequelize-typescript";
import Cocktail from "./models/cocktail";
import Ingredient from "./models/ingredient";
import Recipe from "./models/recipe";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/sequelize.json")[env];

export const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  dialect: "mysql",
  models: [Cocktail, Ingredient, Recipe],
  define: {
    timestamps: false,
  },
});
