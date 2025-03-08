import { Module } from '@nestjs/common';
import { SharedAccessService } from './shared-access.service';
import { SharedAccessController } from './shared-access.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SharedAccessController],
  providers: [SharedAccessService, PrismaService],
})
export class SharedAccessModule {}
