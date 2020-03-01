import { ApiProperty } from '@nestjs/swagger'
import { PaginateNeedAllDto } from '@app/common/dto/paginate.dto'

export class UserDto {
  @ApiProperty({ description: '用户名', example: 'username' })
  username: string

  @ApiProperty({ description: '密码', example: 'password' })
  password: string

  @ApiProperty({ description: '是否为管理员', default: false, required: false })
  isAdmin: boolean

  @ApiProperty({ description: '头像', required: false })
  avatar: string

  @ApiProperty({ description: '简介', required: false })
  summary: string
}

export class QueryUserDto extends PaginateNeedAllDto {
  @ApiProperty({ description: '搜索用户关键字', required: false })
  username?: string
}

export class WhereUserDto {
  username?: string | { $regex: string }
}
