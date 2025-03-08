import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionType } from '@prisma/client';
import { Response as ExpressResponse } from 'express';

interface UserRequest extends Request {
  user: { userId: string };
}

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('dashboard')
  async getDashboard(@Request() req: UserRequest) {
    return this.transactionsService.getDashboard(req.user.userId);
  }

  @Post()
  create(
    @Request() req: UserRequest,
    @Body() body: { title: string; amount: number; type: TransactionType; categoryId?: string },
  ) {
    return this.transactionsService.create(req.user.userId, body);
  }

  @Get()
  findAll(@Request() req: UserRequest) {
    return this.transactionsService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req: UserRequest, @Param('id') id: string) {
    return this.transactionsService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(
    @Request() req: UserRequest,
    @Param('id') id: string,
    @Body() body: { title?: string; amount?: number; type?: TransactionType; categoryId?: string },
  ) {
    return this.transactionsService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  delete(@Request() req: UserRequest, @Param('id') id: string) {
    return this.transactionsService.delete(id, req.user.userId);
  }

  @Get('export/csv')
  async exportCSV(@Request() req: UserRequest, @Response() res: ExpressResponse) {
    const csvData = await this.transactionsService.exportCSV(req.user.userId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=transacoes.csv');
    res.send(csvData);
  }

  @Get('export/pdf')
  async exportPDF(@Request() req: UserRequest, @Response() res: ExpressResponse) {
    const pdfBuffer = await this.transactionsService.exportPDF(req.user.userId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=transacoes.pdf');
    res.send(pdfBuffer);
  }
}
