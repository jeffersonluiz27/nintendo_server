import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('genre')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@LoggedUser() user:User, @Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(user, createGenreDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.genreService.remove(id);
  }
}
