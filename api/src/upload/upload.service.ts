import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(file: Express.Multer.File) {
    const path = file.path.replace('src/', '');
    console.log(path);
    return this.prisma.file.create({
      data: { key: file.filename, url: process.env.API_HOST + '/' + path },
    });
  }
}
