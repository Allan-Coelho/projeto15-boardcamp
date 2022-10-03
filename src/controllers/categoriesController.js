import { STATUS_CODE } from "../enums/statusCode.js";
import { database } from "../database/database.js";

async function listCategories(request, response) {
  try {
    const categories = await database.query("SELECT * FROM categories");
    response.send(categories.rows);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function createCategories(request, response) {
  try {
    const { name } = response.locals.body;

    await database.query("INSERT INTO categories (name) VALUES ($1)", [name]);

    response.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.log(err);
    console.log("createCategories error");
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { listCategories, createCategories };
