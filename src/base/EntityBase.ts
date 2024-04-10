import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, BeforeInsert, BeforeSoftRemove, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';
import { cloneDeep } from 'lodash';

@ObjectType()
export class EntityBase extends BaseEntity {
  public snapshot: this;

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  ID: string;

  @Field(() => Number)
  @Column({ type: 'bigint' })
  createdAt: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;

  loadSnapshotForPartialUpdate() {
    this.snapshot = cloneDeep(this);
  }

  @BeforeInsert()
  async beforeEntityInsert() {
    this.createdAt = Date.now();
  }

  @BeforeUpdate()
  async beforeEntityUpdate() {
    this.updatedAt = Date.now();
  }

  @BeforeSoftRemove()
  async beforeEntityDelete() {
    this.deletedAt = Date.now();
  }
}
