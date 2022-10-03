import { STATUS_CODE } from "../enums/statusCode.js";

function listCustomers(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

function getCustomerById(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

function createCustomer(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}
function updateCustomers(request, response) {
  try {
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { listCustomers, getCustomerById, createCustomer, updateCustomers };
