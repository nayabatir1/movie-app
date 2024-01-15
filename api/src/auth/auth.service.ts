import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SigninDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password, remember }: SigninDTO) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passMatched = await compare(password, user.password);

    if (!passMatched)
      throw new UnauthorizedException('Invalid email or password');

    const payload = {
      sub: user.id,
    };

    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: remember ? '10d' : '1d',
      }),
    };
  }
}
