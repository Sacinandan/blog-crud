import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '../graphql.schema.generated';
import { GqlUser } from '../shared/decorators/decorators';
import { User } from '../../generated/prisma-client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PostInputDto } from './post-input.dto';
import USER_ACCESS from '../user/user-access';

@Resolver('Post')
export class PostResolver {
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
  async posts() {
    return this.prisma.client.posts();
  }

  @Query()
  async post(@Args('id') id: string) {
    return this.prisma.client.post({ id });
  }

  @ResolveProperty()
  async author(@Parent() { id }: Post) {
    return this.prisma.client.post({ id }).author();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('postInput') { title, body }: PostInputDto,
    @GqlUser() user: User,
  ) {
    return this.prisma.client.createPost({
      title,
      body,
      author: { connect: { id: user.id } },
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updatePost(
    @Args('id') id: string,
    @Args('postInput') postInput: PostInputDto,
    @GqlUser() user: User,
  ) {
    if (user.id === await this.getAuthorIdOfPost(id)
    || USER_ACCESS.MODERATOR === await this.prisma.client.user({ id: user.id }).access() ) {
      return this.prisma.client.updatePost({
        data: { ...postInput },
        where: { id }
      });
    } else {
      this.logger.log('warn', `${new Date().toLocaleTimeString()}  User: ${user.email} tried to change post id: ${id}`);
      throw Error(`${user.email} doesn't have access rights for changing this post`);
    }
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deletePost(
    @Args('id') id: string,
    @GqlUser() user: User,
  ) {
    if (user.id === await this.getAuthorIdOfPost(id)
    ||  USER_ACCESS.MODERATOR === await this.prisma.client.user({ id: user.id }).access()) {
      return this.prisma.client.deletePost({ id });
    } else {
      this.logger.log('warn', `${new Date().toLocaleTimeString()}  User: ${user.email} tried to delete post id: ${id}`);
      throw Error(`${user.email} doesn't have access rights for deleting this post`);
    }
  }
}