import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../generated/prisma-client';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private readonly prisma: PrismaService
    ) {}

  async validate({ id }): Promise<User> {
    const user = await this.prisma.client.user({ id });
    if (!user) {
      this.logger.log('error', `${new Date().toLocaleTimeString()}  User id: ${id} not found`);
      throw Error('Authenticate validation error');
    }

    return user;
  }
}
