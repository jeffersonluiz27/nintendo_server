import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcript from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new BadRequestException('Senhas não conferem');
    }

    delete createUserDto.passwordConfirm;

    const data: User = {
      ...createUserDto,
      password: await bcript.hash(createUserDto.password, 10),
    };

    return this.prisma.user.create({
      data,
      select: this.userSelect,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findOne(id: string) {
    const data = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!data) {
      throw new NotFoundException('Usuario não encontrado');
    }

    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    if (updateUserDto.cpf) {
      throw new BadRequestException('Não é possivel alterar o CPF');
    }

    if (updateUserDto.password) {
      if (updateUserDto.password !== updateUserDto.passwordConfirm) {
        throw new BadRequestException('Senhas não conferem');
      }
    }

    delete updateUserDto.passwordConfirm;

    const data = { ...updateUserDto };

    if (data.password) {
      data.password = await bcript.hash(data.password, 10);
    }

    return this.prisma.user.update({
      data,
      where: { id },
      select: this.userSelect,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
