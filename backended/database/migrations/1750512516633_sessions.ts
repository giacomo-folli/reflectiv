import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sessions extends BaseSchema {
  protected tableName = 'sessions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.dateTime("expiresAt").notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
