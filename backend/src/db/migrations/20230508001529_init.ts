import { Knex } from 'knex'

exports.up = function(knex: Knex) {
  return knex.schema.createTable('currency_refresh', table => {
    table.increments('id').primary();
    table.string('code', 3).notNullable();
    table.date('time').notNullable();
    table.timestamps(true, true);
  }).createTable('currency_rates', table => {
    table.increments('id').primary();
    table.string('code', 3).notNullable();
    table.date('time').notNullable();
    table.double('value').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex: Knex) {
  return knex.schema.dropTable('currency_refresh').dropTable('currency_rates');
};
