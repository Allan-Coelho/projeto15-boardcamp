import { STATUS_CODE } from "../enums/statusCode.js";
import { database } from "../database/database.js";

async function listRentals(request, response) {
  try {
    const query = response.locals.query;
    let allRentals;

    if (query !== undefined) {
      allRentals = await database.query("SELECT * FROM rentals WHERE id=$1", [
        query.id,
      ]);
    } else {
      allRentals = await database.query("SELECT * FROM rentals");
    }

    if (allRentals.rows === undefined || allRentals.rows.length === 0) {
      response.send(allRentals.rows);
      return;
    }

    const allGames = await database.query("SELECT * FROM games");
    const allCustomers = await database.query("SELECT * FROM customers");

    for (let i = 0, len = allRentals.length; i < len; i++) {
      const rental = allRentals.rows[i];
      const game = allGames.find((game) => {
        if (game.id === rental.game) {
          return game;
        }
      });
      const customer = allCustomers.find((customer) => {
        if (game.customer === rental.customer) {
          return customer;
        }
      });

      allRentals.rows[i] = { ...rental, game: game, customer: customer };
    }

    response.send(allRentals);
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
