import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AlertsService, PrismaService],
  controllers: [AlertsController],
  exports: [AlertsService],
})
export class AlertsModule {}
