const db = require("../../data/db-config.js");

function getBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function add(data) {
  return db("users")
    .insert(data, "id")
    .then(ids => {
      const [id] = ids;
      return db("users")
        .where({ id })
        .first();
    });
}

module.exports = {
  getBy,
  add
};
