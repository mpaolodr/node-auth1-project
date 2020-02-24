exports.up = function(knex) {
  return knex.schema.createTable("users", col => {
    col.increments();

    col
      .text("username", 255)
      .notNullable()
      .unique()
      .index();
    col.text("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
