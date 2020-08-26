import {
  Table,
  Column,
  DataType,
  BelongsToMany,
  Model,
  HasMany,
} from "sequelize-typescript";
import Ingredient from "./ingredient";
import Recipe from "./recipe";

type AlcoholicStatus = "Alcoholic" | "Non alcoholic" | "Optional alcohol";

@Table
class Cocktail extends Model<Cocktail> {
  @Column name!: string;
  @Column category?: string;
  @Column(DataType.ENUM("Alcoholic", "Non alcoholic", "Optional alcohol"))
  alcoholic?: AlcoholicStatus;
  @Column glass?: string;
  @Column instructions?: string;
  @Column thumbnail?: string;

  @HasMany(() => Recipe)
  recipe!: Recipe[];
}

export default Cocktail;
