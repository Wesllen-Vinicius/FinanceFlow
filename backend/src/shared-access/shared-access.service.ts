import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SharedAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async sendInvite(ownerId: string, sharedWithEmail: string, permission: 'READ' | 'EDIT') {
    const sharedUser = await this.prisma.user.findUnique({ where: { email: sharedWithEmail } });

    if (!sharedUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const existingInvite = await this.prisma.sharedAccess.findFirst({
      where: {
        ownerId,
        sharedWith: sharedUser.id,
        status: 'PENDING',
      },
    });

    if (existingInvite) {
      throw new ForbiddenException('Já existe um convite pendente para este usuário.');
    }

    return await this.prisma.sharedAccess.create({
      data: {
        ownerId,
        sharedWith: sharedUser.id,
        permission,
        status: 'PENDING',
      },
    });
  }

  async getInvites(userId: string) {
    return await this.prisma.sharedAccess.findMany({
      where: { sharedWith: userId, status: 'PENDING' },
      include: { owner: true },
    });
  }

  async respondToInvite(inviteId: string, userId: string, accept: boolean) {
    const invite = await this.prisma.sharedAccess.findUnique({
      where: { id: inviteId },
    });

    if (!invite || invite.sharedWith !== userId) {
      throw new NotFoundException('Convite não encontrado.');
    }

    return await this.prisma.sharedAccess.update({
      where: { id: inviteId },
      data: {
        status: accept ? 'ACCEPTED' : 'REJECTED',
      },
    });
  }

  async getSharedUsers(ownerId: string) {
    return await this.prisma.sharedAccess.findMany({
      where: { ownerId, status: 'ACCEPTED' },
      include: { sharedUser: true },
    });
  }
}
