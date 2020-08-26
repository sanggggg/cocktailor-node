import { CocktailorServer as CocktailorServer } from "./server";
import { sequelize } from "./sequelize";

const server = new CocktailorServer();

sequelize.sync();

server.start(3000);
