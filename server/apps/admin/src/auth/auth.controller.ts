import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  UnauthorizedException
} from '@nestjs/common'
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { LoginDto } from '@app/common/dto/login.dto'
import { InjectModel } from 'nestjs-typegoose'
import { User } from '@libs/db/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登陆' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto, @Req() req) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException('没有权限')
    }
    return {
      token: this.jwtService.sign(String(req.user._id))
    }
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async user(@Req() req) {
    return req.user
  }
}
