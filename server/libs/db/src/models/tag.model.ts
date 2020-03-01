import { prop, Ref, modelOptions } from '@typegoose/typegoose'
import { Article } from './article.model'

@modelOptions({
  schemaOptions: { toJSON: { virtuals: true } }
})
export class Tag {
  @prop({ unique: true })
  name: string

  @prop()
  description: string

  @prop({ ref: 'Article', foreignField: 'tags', localField: '_id' })
  articles: Ref<Article>[]
}
