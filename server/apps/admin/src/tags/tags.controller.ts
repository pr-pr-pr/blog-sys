import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  BadRequestException,
  NotAcceptableException,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Tag } from '@libs/db/models/tag.model';
import { TagDto, QueryTagDto, WhereTagDto } from './tag.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
@ApiTags('标签')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TagsController {
  constructor(@InjectModel(Tag) private readonly tagModel: ReturnModelType<typeof Tag>) {}

  @Get()
  @ApiOperation({ summary: '标签列表' })
  async find(@Query() query: QueryTagDto) {
    if (query.mode === 'all') {
      return await this.tagModel.find();
    }
    // 分页
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    // 排序
    const sort = Number(query.sort) || -1;
    const sortKey = query.sortKey || '_id';
    // 搜索
    const name = query.name || '';
    const where: WhereTagDto = {};
    name && (where.name = { $regex: name });

    const tags = await this.tagModel
      .find()
      .where(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortKey]: sort })
      .catch(() => {
        throw new BadRequestException('参数错误');
      });
    const total = await this.tagModel.countDocuments(where).catch(() => {
      throw new BadRequestException('参数错误');
    });
    return { list: tags, page, limit, total };
  }

  @Get(':id')
  @ApiOperation({ summary: '标签详情' })
  async findOne(@Param('id') id: string) {
    return await this.tagModel.findById(id).catch(() => {
      throw new BadRequestException('标签不存在');
    });
  }

  @Post()
  @ApiOperation({ summary: '创建标签' })
  async create(@Body() tagDto: TagDto) {
    const tag = await this.tagModel.findOne({ name: tagDto.name });
    if (tag) {
      throw new NotAcceptableException('标签名已存在');
    }
    return await this.tagModel.create(tagDto).catch(err => {
      throw new BadRequestException(err);
    });
  }

  @Put(':id')
  @ApiOperation({ summary: '更新标签' })
  async update(@Param('id') id: string, @Body() tagDto: TagDto) {
    const tag = await this.tagModel.findOne({ name: tagDto.name });
    if (tag && String(tag._id) !== id) {
      throw new NotAcceptableException('标签名已存在');
    }
    return await this.tagModel.findByIdAndUpdate(id, tagDto).catch(err => {
      throw new BadRequestException(err);
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除标签' })
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.tagModel.findByIdAndRemove(id).catch(() => {
      throw new BadRequestException('标签不存在');
    });
    return { success: true };
  }
}
