import { prop, arrayProp, modelOptions, Ref } from '@typegoose/typegoose'
import { Tag } from './tag.model'
import { Article } from './article.model'
import { hashSync } from 'bcryptjs'

@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } }
})
export class User {
  @prop({ unique: true })
  username: string

  @prop({
    select: false,
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

  @arrayProp({ itemsRef: 'Tag' })
  tags: Ref<Tag>[]

  @prop({ ref: 'Article', foreignField: 'author', localField: '_id' })
  articles: Ref<Article>[]

  @prop()
  avatar: string

  @prop()
  summary: string
}
