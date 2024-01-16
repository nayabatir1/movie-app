import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddMovieDto, UpdateMovieDTO } from './movie.dto';
import { paginationDTO } from '../util/util.dto';
import { UtilService } from '../util/util.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async add({ title, year, fileId }: AddMovieDto) {
    return this.prisma.movie.create({
      data: { title, year, file: { connect: { id: fileId } } },
    });
  }

  async edit({ title, year, fileId }: UpdateMovieDTO, id: string) {
    return this.prisma.movie.update({
      where: { id },
      data: { title, year, file: { connect: { id: fileId } } },
    });
  }

  async getAll(query: paginationDTO) {
    const [count, docs] = await Promise.all([
      this.prisma.movie.count({}),
      this.prisma.movie.findMany({
        include: { file: true },
        ...UtilService.paginationProps(query),
      }),
    ]);

    const pagination = UtilService.paginate(count, query);
    return { pagination, docs };
  }
}
