import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface UserRequest extends Request {
  user: { userId: string };
}

@Controller('alerts')
@UseGuards(JwtAuthGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post('set-limit')
  setLimit(@Request() req: UserRequest, @Body('monthlyLimit') monthlyLimit: number) {
    if (monthlyLimit === undefined || isNaN(monthlyLimit)) {
      throw new BadRequestException(
        'O campo "monthlyLimit" é obrigatório e deve ser um número válido.',
      );
    }
    return this.alertsService.setMonthlyLimit(req.user.userId, monthlyLimit);
  }

  @Get('check')
  checkAlerts(@Request() req: UserRequest) {
    return this.alertsService.checkAlerts(req.user.userId);
  }
}
