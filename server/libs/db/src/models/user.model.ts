import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { Article } from './article.model'
import { hashSync } from 'bcryptjs'

@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } }
})
export class User {
  @prop({ unique: true, required: true, min: 3, max: 32 })
  username: string

  @prop({
    select: false,
    min: 3,
    max: 32,
    get(val) {
      return val
    },
    set(val) {
      return val ? hashSync(val) : val
    }
  })
  password: string

  @prop({ default: false })
  isAdmin: boolean

  @prop({ ref: 'Article', foreignField: 'author', localField: '_id' })
  articles: Ref<Article>[]

  @prop()
  avatar: string

  @prop()
  summary: string
}
