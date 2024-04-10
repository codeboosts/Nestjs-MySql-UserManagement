import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenOutputDto {
  @Field()
  token: string;
}
