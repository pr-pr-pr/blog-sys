import { ApiProperty } from '@nestjs/swagger'
import { PaginateNeedAllDto } from '@app/common/dto/paginate.dto'

export class TagDto {
  @ApiProperty({ description: '标签名', example: 'TypeScript' })
  name: string

  @ApiProperty({ description: '标签描述', example: 'JavaScript的超集' })
  description: string
}

export class QueryTagDto extends PaginateNeedAllDto {
  @ApiProperty({ description: '搜索标签关键字', required: false })
  name?: string
}

export class WhereTagDto {
  name?: string | { $regex: string }
}
