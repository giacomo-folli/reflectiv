import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, CamelCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Link from '#models/link'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Link)
  declare links: HasMany<typeof Link>

  currentAccessToken?: AccessToken

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '24 hours',
    tokenSecretLength: 64,
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'api'
  })

  static resetPasswordTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '10 minutes',
    tokenSecretLength: 64,
    prefix: 'rpt_',
    table: 'auth_access_tokens',
    type: 'resetPassword'
  })
}