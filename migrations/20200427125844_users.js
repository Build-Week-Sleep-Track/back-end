exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("email").notNullable().unique().index();
      tbl.string("first_name").notNullable();
      tbl.string("last_name").notNullable();
      tbl.string("password").notNullable();
    })
    .createTable("users_sleep", (tbl) => {
      tbl.increments();
      tbl.timestamp("sleep_start", { useTz: false }).notNullable();
      tbl.integer("start_score").notNullable();
      tbl.timestamp("sleep_end", { useTz: false }).notNullable();
      tbl.integer("end_score").notNullable();
      tbl.integer("overall_score").notNullable();
      tbl
        .integer("uid")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users_sleep")
    .dropTableIfExists("users");
};
