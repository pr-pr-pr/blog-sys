import { prop, Ref, arrayProp, modelOptions } from '@typegoose/typegoose';
import { User } from './user.model';
import { Tag } from './tag.model';

@modelOptions({
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } }
})
export class Article {
  @prop({ unique: true, required: true })
  title: string;

  @prop({ required: true })
  summary: string;

  @prop({ required: true })
  content: string;

  @prop({ ref: 'User', required: true })
  author: Ref<User>;

  @arrayProp({ itemsRef: 'Tag', required: true })
  tags: Ref<Tag>[];
}
