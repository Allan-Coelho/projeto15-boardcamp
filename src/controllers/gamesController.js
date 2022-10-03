import { STATUS_CODE } from "../enums/statusCode.js";

async function listGames(request, response) {
  try {
    const games = await database.query("SELECT * FROM games");
    response.send(games.rows);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

function createGame(request, response) {
  try {
    
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { listGames, createGame };
