import { STATUS_CODE } from "../enums/statusCode.js";
function listRentals(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

function createRental(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

function returnRentalById(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

function deleteRentalById(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { listRentals, createRental, returnRentalById, deleteRentalById };
