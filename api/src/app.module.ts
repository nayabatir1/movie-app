import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { envOptions } from './config/envOptions';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot(envOptions),
    AuthModule,
    MovieModule,
    UploadModule,
    PrismaModule,
    UtilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
