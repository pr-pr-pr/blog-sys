import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()
  app.useStaticAssets('uploads', { prefix: '/uploads' })

  const options = new DocumentBuilder()
    .setTitle('博客系统 - 客户端 API')
    .setDescription('供客户端界面调用的服务端API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  const PORT = process.env.SERVER_PORT || 5001
  await app.listen(PORT)
  console.log(`客户端 API 文档地址：http://localhost:${PORT}/api-docs`)
}
bootstrap()
