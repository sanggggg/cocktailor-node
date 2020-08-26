import {
  Table,
  Column,
  DataType,
  Default,
  BelongsToMany,
  Model,
  HasMany,
} from "sequelize-typescript";
import Cocktail from "./cocktail";
import Recipe from "./recipe";

type AlcoholicStatus = "Yes" | "No";

@Table
class Ingredient extends Model<Ingredient> {
  @Column name!: string;
  @Column description?: string;
  @Column drink_type?: string;
  @Column(DataType.ENUM("Yes", "No")) alcoholic?: AlcoholicStatus;
  @Column abv?: string;
  @Column thumbnail?: string;

  @HasMany(() => Recipe)
  used!: Recipe[];
}

export default Ingredient;
