import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserAlertSettings(userId: string) {
    return await this.prisma.alertSettings.findUnique({
      where: { userId },
    });
  }

  async setMonthlyLimit(userId: string, monthlyLimit: number) {
    if (!monthlyLimit || isNaN(monthlyLimit)) {
      throw new BadRequestException('O limite deve ser um número válido.');
    }

    return await this.prisma.alertSettings.upsert({
      where: { userId },
      update: { monthlyLimit: new Prisma.Decimal(Number(monthlyLimit)) },
      create: { userId, monthlyLimit: new Prisma.Decimal(Number(monthlyLimit)) },
    });
  }

  async checkAlerts(userId: string) {
    const settings = await this.getUserAlertSettings(userId);
    if (!settings) throw new NotFoundException('Configuração de alerta não encontrada');

    const expenses = await this.prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'EXPENSE' },
    });

    const totalExpense = expenses._sum.amount ? expenses._sum.amount.toNumber() : 0;
    const limit = settings.monthlyLimit.toNumber();

    if (totalExpense >= limit) {
      return { message: '⚠️ Você ultrapassou seu limite mensal de gastos!', status: 'CRÍTICO' };
    } else if (totalExpense >= limit * 0.8) {
      return { message: '⚠️ Você já gastou 80% do seu limite mensal.', status: 'ALERTA' };
    }

    return { message: '✅ Seus gastos estão dentro do limite.', status: 'OK' };
  }
}
