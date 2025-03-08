import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, TransactionType } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, name: string, type: TransactionType): Promise<Category> {
    return await this.prisma.category.create({
      data: { name, type, userId },
    });
  }

  async findAll(userId: string): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: { userId },
    });
  }

  async delete(userId: string, id: string): Promise<Category> {
    const category = await this.prisma.category.findFirst({ where: { id, userId } });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return await this.prisma.category.delete({ where: { id } });
  }
}
