import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CommonModule } from '@app/common';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [CommonModule, ArticlesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
