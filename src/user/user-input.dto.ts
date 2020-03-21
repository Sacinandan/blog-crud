import { IsString } from 'class-validator';
import { PostInput } from '../graphql.schema.generated';
import USER_ACCESS from './user-access';

export class UserInputDto extends PostInput {
  @IsString()
  readonly access: typeof USER_ACCESS
}