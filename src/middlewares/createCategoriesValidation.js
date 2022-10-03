import { STATUS_CODE } from "../enums/statusCode.js";
import { categoryAlreadyExist } from "../modules/alreadyExist.js";
import { categorySchema } from "../schemas/categorySchema.js";

export async function createCategoriesValidation(request, response, next) {
  try {
    const body = response.locals.body;
    const { value, error } = categorySchema.validate(body);

    if (error !== undefined) {
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    if (await categoryAlreadyExist(value.name)) {
      response.sendStatus(STATUS_CODE.CONFLICT);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}
