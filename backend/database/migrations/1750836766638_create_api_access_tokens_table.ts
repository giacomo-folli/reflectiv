import { BaseSchema } from "@adonisjs/lucid/schema";

export default class ApiTokens extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('name')
      table.string('type').notNullable()
      table.string('hash').notNullable()
      table.text('abilities')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
