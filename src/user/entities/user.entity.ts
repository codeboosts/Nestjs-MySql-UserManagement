import { ObjectType, Field } from '@nestjs/graphql';
import { EntityBase } from 'src/base/EntityBase';
import { onHashPassword } from 'src/utilities/bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends EntityBase {
  @Field()
  @Column({ nullable: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  fullname: string;

  @Field(() => Boolean)
  @Column({ type: 'tinyint', default: false })
  emailVerified: boolean;

  @BeforeInsert()
  beforeInsert() {
    this.password = onHashPassword(this.password);
  }
}
