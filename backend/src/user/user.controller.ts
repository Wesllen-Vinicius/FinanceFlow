import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return await this.userService.create(body);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('E-mail já está em uso');
      }
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
      return await this.userService.update(id, body);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('E-mail já está em uso');
      }
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
