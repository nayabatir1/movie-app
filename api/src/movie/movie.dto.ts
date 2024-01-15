import * as joi from 'joi';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { paginationDTO, paginationSchema } from '../util/util.dto';

const movie = {
  title: joi.string().trim().required(),
  year: joi.string().length(4).required(),
  fileId: joi.string().hex().length(24).required(),
};

export const AddMovieSchema = joi.object(movie);

export class AddMovieDto {
  @ApiProperty({ example: 'Movie 1' })
  title: string;

  @ApiProperty({ example: '1940' })
  year: string;

  @ApiProperty({ example: '' })
  fileId: string;
}

export const UpdateMovieSchema = AddMovieSchema.fork(
  Object.keys(movie),
  (schema) => schema.optional(),
);

export class UpdateMovieDTO extends PartialType(AddMovieDto) {}

export const getAllMovieSchema = paginationSchema;

export class getAllMovieDTO extends paginationDTO {}
