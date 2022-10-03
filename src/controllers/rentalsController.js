import { STATUS_CODE } from "../enums/statusCode.js";
import { database } from "../database/database.js";
import dayjs from "dayjs";
import { dayToMilliseconds, millisecondsToDays } from "../modules/time.js";

async function listRentals(request, response) {
  try {
    const query = response.locals.query;
    let allRentals;

    if (query !== undefined) {
      if (query.customerId !== undefined) {
        allRentals = await database.query(
          'SELECT * FROM rentals WHERE "customerId"=$1',
          [query.customerId]
        );
      }

      if (query.gameId !== undefined) {
        allRentals = await database.query(
          'SELECT * FROM rentals WHERE "gameId"=$1',
          [query.gameId]
        );
      }
    } else {
      allRentals = await database.query("SELECT * FROM rentals");
    }

    if (allRentals.rows === undefined || allRentals.rows.length === 0) {
      response.send(allRentals.rows);
      return;
    }

    const allGames = await database.query(
      'SELECT id, name, "categoryId" FROM games'
    );
    const allCustomers = await database.query("SELECT id, name FROM customers");

    for (let i = 0, len = allRentals.rows.length; i < len; i++) {
      const rental = allRentals.rows[i];
      const game = allGames.rows.find((game) => {
        if (game.id === rental.gameId) {
          return game;
        }
      });
      const queryCategoryName = await database.query(
        "SELECT name FROM categories WHERE id=$1",
        [game.categoryId]
      );
      game.categoryName = queryCategoryName.rows[0].name;
      const customer = allCustomers.rows.find((customer) => {
        if (customer.id === rental.customerId) {
          return customer;
        }
      });

      allRentals.rows[i] = { ...rental, game: game, customer: customer };
    }

    response.send(allRentals.rows);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function createRental(request, response) {
  try {
    const body = response.locals.body;
    const { customerId, gameId, daysRented } = body;
    const rentDate = dayjs().format("YYYY-MM-DD");
    const returnDate = null;
    const queryGame = await database.query("SELECT * FROM games WHERE id=$1", [
      gameId,
    ]);
    const game = queryGame.rows[0];
    const originalPrice = game.pricePerDay * daysRented;
    const delayFee = null;

    await database.query(
      'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        customerId,
        gameId,
        daysRented,
        rentDate,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );

    response.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function returnRentalById(request, response) {
  try {
    const { id } = response.locals.params;
    const returnDate = dayjs().format("YYYY-MM-DD");
    const queryRental = await database.query(
      "SELECT * FROM rentals WHERE id=$1",
      [id]
    );
    console.log("foi  ");
    const { rentDate, daysRented, originalPrice } = queryRental.rows[0];
    const originalReturnDate = rentDate + dayToMilliseconds(daysRented);
    const pricePerDay = originalPrice / daysRented;
    let delayFee = 0;

    if (Date.now() > originalReturnDate) {
      delayFee =
        millisecondsToDays(Date.now() - originalReturnDate) * pricePerDay;
    }

    await database.query(
      'UPDATE rentals SET "returnDate"=$2, "delayFee"=$3 WHERE id=$1',
      [id, returnDate, delayFee]
    );

    response.send(200);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function deleteRentalById(request, response) {
  try {
    const { id } = response.locals.params;
    const rentalsQuery = await database.query(
      "SELECT * FROM rentals WHERE id=$1",
      [id]
    );
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { listRentals, createRental, returnRentalById, deleteRentalById };
