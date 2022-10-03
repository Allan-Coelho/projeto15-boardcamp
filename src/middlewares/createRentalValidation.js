import { STATUS_CODE } from "../enums/statusCode.js";
import {
  customerAlreadyExist,
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

    if (await customerAlreadyExist(cpf)) {
      response.sendStatus(STATUS_CODE.CONFLICT);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { createCustomersValidation };
