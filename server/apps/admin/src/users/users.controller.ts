import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
  NotAcceptableException,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { User } from '@libs/db/models/user.model'
import { UserDto, QueryUserDto, WhereUserDto } from './user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
@ApiTags('用户')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>
  ) {}

  @Get()
  @ApiOperation({ summary: '用户列表' })
  async find(@Query() query: QueryUserDto) {
    if (query.mode === 'all') {
      return await this.userModel.find()
    }
    // 分页
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    // 排序
    const sort = Number(query.sort) || -1
    const sortKey = query.sortKey || '_id'
    // 搜索
    const username = query.username || ''
    const where: WhereUserDto = {}
    username && (where.username = { $regex: username })

    const users = await this.userModel
      .find()
      .where(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortKey]: sort })
    const total = await this.userModel.countDocuments(where)
    return { list: users, page, limit, total }
  }

  @Get(':id')
  @ApiOperation({ summary: '用户详情' })
  async findOne(@Param('id') id: string) {
    return await this.userModel.findById(id).catch(() => {
      throw new BadRequestException('用户不存在')
    })
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() userDto: UserDto) {
    const user = await this.userModel.findOne({ username: userDto.username })
    if (user) {
      throw new NotAcceptableException('用户名已存在')
    }
    return await this.userModel.create(userDto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    const user = await this.userModel.findOne({ username: userDto.username })
    if (user && String(user._id) !== id) {
      throw new NotAcceptableException('用户名已存在')
    }
    return await this.userModel.findByIdAndUpdate(id, userDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string) {
    await this.userModel.findByIdAndRemove(id).catch(() => {
      throw new BadRequestException('用户不存在')
    })
    return { success: true }
  }
}
