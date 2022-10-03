async function createGamesValidation(request, response, next) {
  try {
    const categories = await database.query("SELECT * FROM categories");
    response.send(categories.rows);
  } catch (err) {
    console.log(err);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}
