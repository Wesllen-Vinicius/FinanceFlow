import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { AlertsController } from './alerts/alerts.controller';
import { AlertsService } from './alerts/alerts.service';
import { AlertsModule } from './alerts/alerts.module';
import { PrismaService } from './prisma/prisma.service';
import { SharedAccessModule } from './shared-access/shared-access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    TransactionsModule,
    CategoriesModule,
    AlertsModule,
    SharedAccessModule,
  ],
  providers: [PrismaService],
  controllers: [AlertsController],
})
export class AppModule {}
