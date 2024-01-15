import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { JoiQueryValidationPipe } from '../joi-validation/query.validation';
import {
  AddMovieDto,
  AddMovieSchema,
  UpdateMovieDTO,
  UpdateMovieSchema,
  getAllMovieDTO,
  getAllMovieSchema,
} from './movie.dto';
import { MovieService } from './movie.service';
import { UtilService } from '../util/util.service';
import { JoiBodyValidationPipe } from '../joi-validation/body.validation';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('movie')
@ApiBearerAuth()
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly service: MovieService) {}
  @Post()
  @UsePipes(new JoiBodyValidationPipe(AddMovieSchema))
  async create(@Body() body: AddMovieDto) {
    const data = await this.service.add(body);

    return UtilService.buildResponse(data);
  }

  @Patch(':id')
  @UsePipes(new JoiBodyValidationPipe(UpdateMovieSchema))
  async edit(@Body() body: UpdateMovieDTO, @Param('id') id: string) {
    const data = await this.service.edit(body, id);

    return UtilService.buildResponse(data);
  }

  @Get()
  @UsePipes(new JoiQueryValidationPipe(getAllMovieSchema))
  async getAll(@Query() query: getAllMovieDTO) {
    const data = await this.service.getAll(query);

    return UtilService.buildResponse(data);
  }
}
