import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SigninDTO, SigninScehma } from './auth.dto';
import { UtilService } from '../util/util.service';
import { Public } from '../public/public.decorator';
import { JoiBodyValidationPipe } from '../joi-validation/body.validation';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @Public()
  @Post('signin')
  @UsePipes(new JoiBodyValidationPipe(SigninScehma))
  async signIn(@Body() body: SigninDTO) {
    const data = await this.service.signIn(body);

    return UtilService.buildResponse(data);
  }
}
