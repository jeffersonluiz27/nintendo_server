import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createGenreDto: CreateGenreDto) {
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'Usuario deve ser Admin para criar um genero',
      );
    }
    const genre = await this.prisma.genre.findUnique({
      where: {
        name: createGenreDto.name,
      },
    });

    if (genre) {
      throw new NotFoundException('Nome do genero já cadastrado');
    }

    return this.prisma.genre.create({
      data: { name: createGenreDto.name },
    });
  }

  findAll() {
    return `This action returns all genre`;
  }

  findOne(id: string) {
    return `This action returns a #${id} genre`;
  }

  update(id: string, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: string) {
    return `This action removes a #${id} genre`;
  }
}
