import { database } from "pg/lib/defaults.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import {
  customerIdAlreadyExist,
  gameAlreadyExist,
} from "../modules/alreadyExist.js";
import { rentalSchema } from "../schemas/rentalSchema.js";

async function createCustomersValidation(request, response, next) {
  try {
    const body = response.locals.body;
    const { value, error } = rentalSchema.validate(body);

    if (error !== undefined) {
      console.log(error);
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    const { customerId, gameId, daysRented } = value;

    if (
      !(await customerIdAlreadyExist(customerId)) ||
      !(await gameAlreadyExist(gameId))
    ) {
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }
    
    const game = await database.query(
      "SELECT stockTotal FROM games WHERE id=$1",
      [gameId]
    );

    const activeRentalsByGameId = await database.query(
      'SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate"=null',
      [gameId]
    );

    if (game.stockTotal <= activeRentalsByGameId.rows.length) {
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { createCustomersValidation };
