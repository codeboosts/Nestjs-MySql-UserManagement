import { User } from 'src/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectEntityManager() entityManager: EntityManager) {
    super(User, entityManager);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.findOne({ where: { email } });
  }

  public async findById(ID: string): Promise<User> {
    return await this.findOne({ where: { ID } });
  }

  public async isUserExist(email: string): Promise<boolean> {
    return await this.exist({ where: { email } });
  }
}
