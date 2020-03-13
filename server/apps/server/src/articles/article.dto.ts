import { ApiProperty } from '@nestjs/swagger'
import { PaginateDto } from '@app/common/dto/paginate.dto'

export class QueryArticleDto extends PaginateDto {
  @ApiProperty({ description: '搜索文章标题关键字', required: false })
  title?: string

  @ApiProperty({ description: '根据标签ID筛选', required: false })
  tag?: string

  @ApiProperty({ description: '根据用户ID筛选', required: false })
  author?: string
}

export class WhereArticleDto {
  title?: string | { $regex: string }

  tags?: string

  author?: string
}
