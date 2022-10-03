import { STATUS_CODE } from "../enums/statusCode.js";
import { customerSchema } from "../schemas/customerSchema.js";
import { database } from "../database/database.js";

async function updateCustomersValidation(request, response, next) {
  try {
    const body = response.locals.body;
    const { value, error } = customerSchema.validate(body);
    const { cpf } = value;
    const { id } = response.locals.params;

    if (error !== undefined) {
      console.log(error);
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    const result = await database.query(
      "SELECT * FROM customers WHERE cpf=$1 AND id<>$2",
      [cpf, id]
    );

    console.log(result);
    if (result.rowCount !== 0) {
      response.sendStatus(STATUS_CODE.CONFLICT);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { updateCustomersValidation };
