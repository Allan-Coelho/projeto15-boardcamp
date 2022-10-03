import Joi from "joi";
import { database } from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import {
  gameAlreadyExist,
  categoryAlreadyExist,
} from "../modules/alreadyExist.js";
import { gameSchema } from "../schemas/gameSchema.js";

async function createGamesValidation(request, response, next) {
  try {
    const body = response.locals.body;
    const { value, error } = gameSchema.validate(body);
    const { name, categoryId } = value;
    const categoryName = await database.query(
      "SELECT name FROM categories WHERE id=$1",
      [categoryId]
    );

    if (error !== undefined) {
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    if (await gameAlreadyExist(name)) {
      response.sendStatus(STATUS_CODE.CONFLICT);
      return;
    }

    if (!categoryAlreadyExist(categoryName.rows[0].name)) {
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { createGamesValidation };
