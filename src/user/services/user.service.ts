import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { AuthenticationEntity } from 'src/authentication/entities';
import { UserRepository } from '../repositories';
import { UserEntity } from '../entities';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(
    createUserDto: CreateUserDto,
    authentication: AuthenticationEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...createUserDto,
      authentication,
    });

    return queryRunner.manager.save(user);
  }
}
