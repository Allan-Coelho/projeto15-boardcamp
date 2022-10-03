import { database } from "../database/database.js";

async function categoryAlreadyExist(value) {
  try {
    const result = await database.query(
      "SELECT name FROM categories WHERE name=$1",
      [value]
    );

    return result.rowCount === 0 ? false : true;
  } catch (err) {
    console.log(err);
    console.log("alreadyExist error");
  }
}

async function gameAlreadyExist(value) {
  try {
    const result = await database.query(
      "SELECT name FROM games WHERE name=$1",
      [value]
    );

    return result.rowCount === 0 ? false : true;
  } catch (err) {
    console.log(err);
    console.log("alreadyExist error");
  }
}

export { categoryAlreadyExist, gameAlreadyExist };
