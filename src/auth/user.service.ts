import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserDto } from './input/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(
      new User({
        ...createUserDto,
        password: await this.authService.hashPassword(createUserDto.password),
      }),
    );
  }
}
