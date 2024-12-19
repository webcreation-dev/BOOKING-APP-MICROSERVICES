import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RequestUser } from '../interfaces/request-user.interface';
import { compareUserId } from '../util/authentication.util';
import { Role } from '../roles/enums/role.enum';
import { HashingService } from '../hashing/hashing.service';
import { LoginDto } from '../dto/login.dto';
import { DefaultPageSize, PaginationDto, PaginationService } from '@app/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page } = paginationDto;
    const limit = paginationDto.limit ?? DefaultPageSize.USER;
    const offset = this.paginationService.calculateOffset(limit, page);

    const [data, count] = await this.usersRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    const meta = this.paginationService.createMeta(limit, page, count);

    return { data, meta };
  }

  async findOne(id: number) {
    return this.usersRepository.findOneOrFail({
      where: { id },
      relations: {
        // orders: {
        //   items: true,
        // },
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: RequestUser,
  ) {
    if (currentUser.role !== Role.ADMIN) {
      compareUserId(currentUser.id, id);
    }

    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number, soft: boolean, currentUser: RequestUser) {
    if (currentUser.role !== Role.ADMIN) {
      compareUserId(currentUser.id, id);
    }

    if (!soft) {
      throw new ForbiddenException('Forbidden resource');
    }

    const user = await this.findOne(id);
    return soft
      ? this.usersRepository.softRemove(user)
      : this.usersRepository.remove(user);
  }

  async recover(loginDto: LoginDto) {
    const { phone, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { phone },
      relations: {
        // orders: {
        //   items: true,
        // },
      },
      withDeleted: true,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid phone');
    }

    const isMatch = await this.hashingService.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!user.isDeleted) {
      throw new ConflictException('User not deleted');
    }

    return this.usersRepository.recover(user);
  }
}
