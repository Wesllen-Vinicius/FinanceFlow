import { Controller, Get, Post, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionType } from '@prisma/client';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Request() req, @Body() body: { name: string; type: TransactionType }) {
    return this.categoriesService.create(req.user.userId, body.name, body.type);
  }

  @Get()
  findAll(@Request() req) {
    return this.categoriesService.findAll(req.user.userId);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.categoriesService.delete(req.user.userId, id);
  }
}
