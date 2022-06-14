import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  login(createUserDto: CreateUserDto) {
    const email = createUserDto.email.toString().trim();

    return this.db.user.upsert({
      where: {
        email,
      },
      create: {
        email,
      },
      update: {
        email,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
