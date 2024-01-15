import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UtilService } from '../util/util.service';
import { diskStorage } from 'multer';
import { mkdir } from 'fs';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { JoiBodyValidationPipe } from '../joi-validation/body.validation';
import { FilesUploadDTO, fileUploadSchema } from './upload.dto';

@Controller('file')
@ApiTags('File')
@ApiBearerAuth()
export class UploadController {
  constructor(private readonly service: UploadService) {}

  @ApiOperation({ summary: 'Universal file upload API' })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination(req, file, callback) {
          const dest = './src/uploads';
          mkdir(dest, { recursive: true }, () => {
            callback(null, dest);
          });
        },
        filename(req, file, callback) {
          const ext = extname(file.originalname);

          const name = `${new Date().getTime()}${ext}`;
          callback(null, name);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of files to upload',
    type: FilesUploadDTO,
  })
  @UsePipes(new JoiBodyValidationPipe(fileUploadSchema))
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploaded = await this.service.upload(file);
    return UtilService.buildResponse(uploaded);
  }
}
