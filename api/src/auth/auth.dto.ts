import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export const SigninScehma = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  remember: joi.bool().default(false),
});

export class SigninDTO {
  @ApiProperty({ example: 'abcd@example.com' })
  email: string;

  @ApiProperty({ example: 'qwerty4321' })
  password: string;

  @ApiProperty({ default: false, example: true })
  remember: boolean;
}
