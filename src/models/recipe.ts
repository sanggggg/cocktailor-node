import { Table, Model, ForeignKey, Column, PrimaryKey, BelongsTo } from "sequelize-typescript";
import Cocktail from "./cocktail";
import Ingredient from "./ingredient";

@Table
class Recipe extends Model<Recipe> {

  @PrimaryKey
  @ForeignKey(() => Cocktail)
  @Column
  idcocktail!: number;

  @BelongsTo(() => Cocktail)
  cocktail!: Cocktail;

  @PrimaryKey
  @ForeignKey(() => Ingredient)
  @Column
  idingredient!: number;

  @BelongsTo(() => Ingredient)
  ingredient!: Ingredient;

  @Column
  measure!: string;
}

export default Recipe;
