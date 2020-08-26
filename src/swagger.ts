const swaggerJSDoc = require("swagger-jsdoc");

export const swaggerDocument = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Cocktailor",
      description: "Drink more!",
      license: {
        name: "sanggggg",
        url: "https://github.com/sanggggg",
      },
    },
  },
  apis: ["src/**/*.ts", "out/src/**/*.js"],
});
