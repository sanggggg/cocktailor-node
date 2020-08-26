# cocktailor-node
Backend server written in node.js(express.js)

## Start with
- add sequelize.json
````json
// example of sequelize.json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "dtabase_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

````
- `npm install`
- `npm start dev`

## Swagger document
- At `{serverurl, port}/docs`