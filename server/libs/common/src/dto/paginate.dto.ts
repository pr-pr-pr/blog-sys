import { ApiProperty } from '@nestjs/swagger';

export class PaginateDto {
  @ApiProperty({ description: '页码', default: 1, required: false })
  page?: number;

  @ApiProperty({
    description: '每页显示多少条数据',
    default: 10,
    required: false
  })
  limit?: number;

  @ApiProperty({
    description: '排序 1:正序 -1:倒序',
    default: -1,
    required: false,
    enum: [1, -1]
  })
  sort?: 1 | -1;

  @ApiProperty({
    description: '排序根据的 key',
    default: 'id',
    required: false
  })
  sortKey?: string;
}

export class PaginateNeedAllDto extends PaginateDto {
  @ApiProperty({
    description: '分页不需要传此参数，此参数为 all 时显示全部数据，其余所有参数无效',
    required: false
  })
  mode?: string;
}
