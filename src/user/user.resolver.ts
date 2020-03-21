import { 
  Args, 
  Mutation,
  Parent, 
  Query, 
  ResolveProperty, 
  Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Logger } from 'winston';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { GqlUser } from '../shared/decorators/decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { User } from '../graphql.schema.generated';
import { SignUpInputDto } from '../auth/sign-up-input.dto';
import USER_ACCESS from './user-access';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private readonly prisma: PrismaService
    ) {}

  private readonly getAuthorIdOfPost = async(id: string): Promise<string> => {
    return await this.prisma.client.post({ id }).author()
      .then(author => author.id);
  }

  @Query()
  async users() {
    return this.prisma.client.users();
  }
  
  @Query()
  async user(@Args('id') id: string) {
    return this.prisma.client.user({ id });
  }

  @ResolveProperty()
  async posts(@Parent() { id }: User) {
    return this.prisma.client.user({ id }).posts();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('id') id: string,
    @Args('signUpInput') signUpInput: SignUpInputDto,
    @GqlUser() user: User,
  ) {
    const password = await bcryptjs.hash(signUpInput.password, 10);

    if (user.id === await this.prisma.client.user({ id }).id()
    || USER_ACCESS.ADMIN === await this.prisma.client.user({ id: user.id }).access()) {
      return this.prisma.client.updateUser({
        data: { 
          ...signUpInput,
          password
         },
        where: { id }
      });
    } else {
      this.logger.log('warn', `${new Date().toLocaleTimeString()}  User: ${user.email} tried to change user with id: ${id}`);
      throw Error(`${user.email} doesn't have access rights for changing this user`);
    }
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteUser(
    @Args('id') id: string,
    @GqlUser() user: User,
  ) {
    if (user.id === await this.prisma.client.user({ id }).id()
    || USER_ACCESS.ADMIN === await this.prisma.client.user({ id: user.id }).access() ) {
      await this.prisma.client.deleteManyPosts({ author: await this.prisma.client.user({id}) })
      return await this.prisma.client.deleteUser({ id });
    } else {
      this.logger.log('warn', `${new Date().toLocaleTimeString()}  User: ${user.email} tried to delete user with id: ${id}`);
      throw Error(`${user.email} doesn't have access rights for deleting this user`);
    }
  }
}