import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessOutput {
  @Field(() => Boolean)
  isSuccess: boolean;
}

@ObjectType()
export class MessageOutput {
  @Field()
  message: string;
}
