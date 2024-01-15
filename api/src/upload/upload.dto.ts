import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';

export const fileUploadSchema = joi.object({
  file: joi.binary().required(),
});

export class FilesUploadDTO {
  @ApiProperty({
    description: 'all file allowed',
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: BinaryData;
}
