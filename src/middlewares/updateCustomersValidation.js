import { STATUS_CODE } from "../enums/statusCode.js";
import { customerAlreadyExist } from "../modules/alreadyExist.js";
import { customerSchema } from "../schemas/customerSchema.js";

async function updateCustomersValidation(request, response, next) {
  try {
    const body = response.locals.body;
    const { value, error } = customerSchema.validate(body);
    const { cpf } = value;

    if (error !== undefined) {
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    if (await customerAlreadyExist(cpf, 1)) {
      next();
      return;
    } else {
      response.sendStatus(STATUS_CODE.CONFLICT);
    }
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { updateCustomersValidation };
