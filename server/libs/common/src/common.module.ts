import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';
import { PaginateDto, PaginateNeedAllDto } from './dto/paginate.dto';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET
        };
      }
    }),
    PaginateDto,
    PaginateNeedAllDto,
    AuthModule
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule]
})
export class CommonModule {}
