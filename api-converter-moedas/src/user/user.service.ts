import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {

    return await this.userRepository.find({
      relations: {
        transactions: true
      },
    })

  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id }, relations: { transactions: true }
    })
  }

  async create(user: User): Promise<User> {

    return await this.userRepository.save(user);

  }

  async update(id: number, user: User): Promise<UpdateResult> {
    return await this.userRepository.update(id, user)
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}