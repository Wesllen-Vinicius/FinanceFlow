import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Transaction, TransactionType } from '@prisma/client';
import { format } from '@fast-csv/format';
import PDFDocument = require('pdfkit');

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(userId: string) {
    const incomes = await this.prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'INCOME' },
    });

    const expenses = await this.prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'EXPENSE' },
    });

    const totalIncome = incomes._sum.amount
      ? new Prisma.Decimal(incomes._sum.amount).toNumber()
      : 0;
    const totalExpense = expenses._sum.amount
      ? new Prisma.Decimal(expenses._sum.amount).toNumber()
      : 0;
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance,
    };
  }

  async create(
    userId: string,
    data: { title: string; amount: number; type: TransactionType; categoryId?: string },
  ): Promise<Transaction> {
    if (data.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: { id: data.categoryId, userId },
      });

      if (!category) {
        throw new ForbiddenException('Categoria inválida ou não pertence ao usuário');
      }
    }

    return await this.prisma.transaction.create({
      data: {
        title: data.title,
        amount: new Prisma.Decimal(data.amount),
        type: data.type,
        userId,
        categoryId: data.categoryId ?? null,
      },
    });
  }

  async findAllByUser(userId: string): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, userId },
      include: { category: true },
    });

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    return transaction;
  }

  async update(
    id: string,
    userId: string,
    data: { title?: string; amount?: number; type?: TransactionType; categoryId?: string },
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    if (data.categoryId && data.categoryId !== transaction.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: { id: data.categoryId, userId },
      });

      if (!category) {
        throw new ForbiddenException('Categoria inválida ou não pertence ao usuário');
      }
    }

    return await this.prisma.transaction.update({
      where: { id },
      data: {
        title: data.title ?? transaction.title,
        amount: data.amount ? new Prisma.Decimal(data.amount) : transaction.amount,
        type: data.type ?? transaction.type,
        categoryId: data.categoryId ?? transaction.categoryId,
      },
    });
  }

  async delete(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    return await this.prisma.transaction.delete({
      where: { id },
    });
  }

  async exportCSV(userId: string): Promise<string> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    if (transactions.length === 0) {
      throw new NotFoundException('Nenhuma transação encontrada para exportação');
    }

    const csvStream = format({ headers: true });
    let csvData = '';

    transactions.forEach((t) => {
      csvStream.write({
        id: t.id,
        title: t.title,
        amount: t.amount.toNumber(),
        type: t.type,
        category: t.category ? t.category.name : 'Sem categoria',
        createdAt: t.createdAt.toISOString(),
      });
    });

    csvStream.end();

    return new Promise((resolve) => {
      csvStream.on('data', (chunk) => (csvData += chunk));
      csvStream.on('end', () => resolve(csvData));
    });
  }

  async exportPDF(userId: string): Promise<Buffer> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    if (transactions.length === 0) {
      throw new NotFoundException('Nenhuma transação encontrada para exportação');
    }

    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));

    doc.fontSize(20).text('Relatório Financeiro', { align: 'center' });
    doc.moveDown();

    transactions.forEach((t) => {
      doc
        .fontSize(12)
        .text(
          `${t.createdAt.toISOString()} - ${t.title} - R$${t.amount.toNumber()} (${t.type}) - ${t.category ? t.category.name : 'Sem categoria'}`,
        );
      doc.moveDown(0.5);
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }
}
