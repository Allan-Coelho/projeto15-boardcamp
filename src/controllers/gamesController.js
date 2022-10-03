import { STATUS_CODE } from "../enums/statusCode.js";
import { database } from "../database/database.js";

async function listGames(request, response) {
  try {
    const query = response.locals.query;
    let games;

    if (query === undefined) {
      games = await database.query("SELECT * FROM games");
      response.send(games.rows);
      return;
    }

    const { name } = query;
    games = await database.query(
      "SELECT * FROM games WHERE lower(name) LIKE lower($1)%",
      [name]
    );
    response.send(games.rows);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function createGame(request, response) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } =
      response.locals.body;

    await database.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    response.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { listGames, createGame };
