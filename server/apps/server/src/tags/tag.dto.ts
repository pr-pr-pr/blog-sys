import { ApiProperty } from '@nestjs/swagger';
import { PaginateNeedAllDto } from '@app/common/dto/paginate.dto';

export class QueryTagDto extends PaginateNeedAllDto {
  @ApiProperty({ description: '搜索标签关键字', required: false })
  name?: string;
}

export class WhereTagDto {
  name?: string | { $regex: string };
}
