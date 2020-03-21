import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE } from '@nestjs/core';
import { GraphqlOptions } from './graphql.options';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: `./logs/error-${new Date().toLocaleDateString()}.log`, level: 'error' }),
        new winston.transports.File({ filename: `./logs/combined-${new Date().toLocaleDateString()}.log` }),
        new winston.transports.Console()
      ]
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    PrismaModule,
    AuthModule,
    PostModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})

export class AppModule {}
