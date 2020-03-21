import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../graphql.schema.generated';
import { ResGql } from '../shared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpInputDto } from './sign-up-input.dto';
import { Logger } from 'winston';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) {}

  @Mutation()
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @ResGql() res: Response,
  ) {
    const user = await this.prisma.client.user({ email });
    if (!user) {
      this.logger.log('error', `${new Date().toLocaleTimeString()}  User entered an invalid email`);
      throw Error('Email or password incorrect');
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      this.logger.log('error', `${new Date().toLocaleTimeString()}  User: ${user.email} entered an invalid password`);
      throw Error('Email or password incorrect');
    }

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }

  @Mutation()
  async signup(
    @Args('signUpInput') signUpInputDto: SignUpInputDto,
    @ResGql() res: Response,
  ) {
    const emailExists = await this.prisma.client.$exists.user({
      email: signUpInputDto.email,
    });

    if (emailExists) {
      this.logger.log('error', `${new Date().toLocaleTimeString()}  User: ${signUpInputDto.email} already has an account`);
      throw Error('Email is already in use');
    }

    const password = await bcryptjs.hash(signUpInputDto.password, 10);

    const user = await this.prisma.client.createUser({ 
      ...signUpInputDto,
      password
    });

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }
}
