import { STATUS_CODE } from "../enums/statusCode.js";
import { database } from "../database/database.js";

async function returnRentalValidation(request, response, next) {
  try {
    const { id } = response.locals.params;
    const rentalsQuery = await database.query(
      "SELECT * FROM rentals WHERE id=$1",
      [id]
    );

    console.log(rentalsQuery)
    if (rentalsQuery.rowCount === 0) {
      response.sendStatus(STATUS_CODE.NOT_FOUND);
      return;
    }

    if (rentalsQuery.rows[0].returnDate !== null) {
      response.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { returnRentalValidation };
