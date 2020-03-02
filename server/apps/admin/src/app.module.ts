import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@app/common';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CommonModule, UsersModule, ArticlesModule, TagsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
