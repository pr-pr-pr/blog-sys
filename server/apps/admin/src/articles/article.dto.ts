import { ApiProperty } from '@nestjs/swagger';
import { PaginateDto } from '@app/common/dto/paginate.dto';

export class ArticleDto {
  @ApiProperty({ description: '文章标题', example: '文章标题' })
  title: string;

  @ApiProperty({ description: '文章摘要', example: '文章摘要' })
  summary: string;

  @ApiProperty({ description: '文章内容', example: '文章内容' })
  content: string;

  @ApiProperty({ description: '文章作者', example: '文章作者' })
  author: string;

  @ApiProperty({ description: '文章标签', example: ['文章标签'] })
  tags: string[];
}

export class QueryArticleDto extends PaginateDto {
  @ApiProperty({ description: '搜索文章标题关键字', required: false })
  title?: string;

  @ApiProperty({ description: '根据标签ID筛选', required: false })
  tag?: string;

  @ApiProperty({ description: '根据用户ID筛选', required: false })
  author?: string;
}

export class WhereArticleDto {
  title?: string | { $regex: string };

  tags?: string;

  author?: string;
}
