import { Controller, Get, Post, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@ApiTags('其他')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '文件上传',
    description:
      '上传文件对象 <br> 参数名：file <br> 数据类型：form-data <br> 返回数据：{ "path": "/uploads/{image_url}" }'
  })
  async upload(@UploadedFile('file') file) {
    if (!file) {
      throw new BadRequestException('上传失败');
    }
    return { path: file.path.replace(/\\/g, '/') };
  }
}
