import {
  Controller,
  Get,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Article } from '@libs/db/models/article.model';
import { QueryArticleDto, WhereArticleDto } from './article.dto';

@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>,
  ) {}

  @Get()
  @ApiOperation({ summary: '文章列表' })
  async find(@Query() query: QueryArticleDto) {
    // 分页
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    // 排序
    const sort = Number(query.sort) || -1;
    const sortKey = query.sortKey || '_id';
    // 搜索
    const where: WhereArticleDto = {};
    const title = query.title || '';
    title && (where.title = { $regex: title });
    const tag = query.tag || '';
    tag && (where.tags = tag);
    const author = query.author || '';
    author && (where.author = author);

    const articles = await this.articleModel
      .find()
      .where(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortKey]: sort })
      .populate('author')
      .populate('tags')
      .catch(() => {
        throw new BadRequestException('参数错误');
      });
    const total = await this.articleModel.countDocuments(where).catch(() => {
      throw new BadRequestException('参数错误');
    });
    return { list: articles, page, limit, total };
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async findOne(@Param('id') id: string) {
    return await this.articleModel
      .findById(id)
      .populate('tags')
      .populate('users')
      .catch(() => {
        throw new BadRequestException('文章不存在');
      });
  }
}
