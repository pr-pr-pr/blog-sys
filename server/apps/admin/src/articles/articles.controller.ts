import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Post,
  Body,
  NotAcceptableException,
  Put,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { Article } from '@libs/db/models/article.model'
import { ArticleDto, WhereArticleDto, QueryArticleDto } from './article.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('articles')
@ApiTags('文章')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ArticlesController {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>
  ) {}

  @Get()
  @ApiOperation({ summary: '文章列表' })
  async find(@Query() query: QueryArticleDto) {
    // 分页
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    // 排序
    const sort = Number(query.sort) || -1
    const sortKey = query.sortKey || '_id'
    // 搜索
    const title = query.title || ''
    const where: WhereArticleDto = {}
    title && (where.title = { $regex: title })
    const articles = await this.articleModel
      .find()
      .where(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortKey]: sort })
      .populate('author')
      .populate('tags')
    const total = await this.articleModel.countDocuments(where)
    return { list: articles, page, limit, total }
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async findOne(@Param('id') id: string) {
    return await this.articleModel
      .findById(id)
      .populate('tags')
      .populate('users')
      .catch(() => {
        throw new BadRequestException('文章不存在')
      })
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  async create(@Body() articleDto: ArticleDto) {
    const article = await this.articleModel.findOne({ title: articleDto.title })
    if (article) {
      throw new NotAcceptableException('文章名已存在')
    }
    return await this.articleModel.create(articleDto).catch(() => {
      throw new BadRequestException('参数错误')
    })
  }

  @Put(':id')
  @ApiOperation({ summary: '更新文章' })
  async update(@Param('id') id: string, @Body() articleDto: ArticleDto) {
    const article = await this.articleModel.findOne({ name: articleDto.title })
    if (article && String(article._id) !== id) {
      throw new NotAcceptableException('文章名已存在')
    }
    return await this.articleModel.findByIdAndUpdate(id, articleDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param('id') id: string) {
    await this.articleModel.findByIdAndRemove(id).catch(() => {
      throw new BadRequestException('文章不存在')
    })
    return { success: true }
  }
}
