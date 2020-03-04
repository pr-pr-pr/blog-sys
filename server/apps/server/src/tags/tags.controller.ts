import { Controller, Get, Query, BadRequestException } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { Tag } from '@libs/db/models/tag.model'
import { QueryTagDto, WhereTagDto } from './tag.dto'

@Controller('tags')
@ApiTags('标签')
export class TagsController {
  constructor(
    @InjectModel(Tag) private readonly tagModel: ReturnModelType<typeof Tag>
  ) {}

  @Get()
  @ApiOperation({ summary: '标签列表' })
  async find(@Query() query: QueryTagDto) {
    if (query.mode === 'all') {
      return await this.tagModel.find()
    }
    // 分页
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    // 排序
    const sort = Number(query.sort) || -1
    const sortKey = query.sortKey || '_id'
    // 搜索
    const name = query.name || ''
    const where: WhereTagDto = {}
    name && (where.name = { $regex: name })

    const tags = await this.tagModel
      .find()
      .where(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortKey]: sort })
      .catch(() => {
        throw new BadRequestException('参数错误')
      })
    const total = await this.tagModel.countDocuments(where).catch(() => {
      throw new BadRequestException('参数错误')
    })
    return { list: tags, page, limit, total }
  }
}
