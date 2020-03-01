import { Module } from '@nestjs/common'
import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [PassportModule],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy]
})
export class AuthModule {}
