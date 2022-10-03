import { STATUS_CODE } from "../enums/statusCode.js";
import { database } from "../database/database.js";

async function listCustomers(request, response) {
  try {
    const query = response.locals.query;
    let customers;

    if (query !== undefined) {
      customers = await database.query(
        "SELECT * FROM customers WHERE cpf LIKE $1%",
        [query.cpf]
      );
      response.send(customers);
      return;
    }

    customers = database.query("SELECT * FROM customers");
    response.send(customers);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function getCustomerById(request, response) {
  try {
    const { id } = response.locals.params;

    const customer = await database.query(
      "SELECT * FROM customers WHERE id=$1",
      [id]
    );

    if (customer.rowCount === 0) {
      response.sendStatus(STATUS_CODE.NOT_FOUND);
      return;
    }

    response.send(customer.rows[0]);
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
