import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('博客系统 - 后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  const PORT = process.env.ADMIN_PORT || 5000
  await app.listen(PORT)
  console.log(`后台管理 API 文档地址：http://localhost:${PORT}/api-docs`)
}
bootstrap()
