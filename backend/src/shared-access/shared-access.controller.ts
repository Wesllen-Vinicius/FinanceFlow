import { Controller, Post, Get, Body, Param, Request, UseGuards } from '@nestjs/common';
import { SharedAccessService } from './shared-access.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface UserRequest extends Request {
  user: { userId: string };
}

@UseGuards(JwtAuthGuard)
@Controller('shared-access')
export class SharedAccessController {
  constructor(private readonly sharedAccessService: SharedAccessService) {}

  @Post('invite')
  sendInvite(
    @Request() req: UserRequest,
    @Body() body: { email: string; permission: 'READ' | 'EDIT' },
  ) {
    return this.sharedAccessService.sendInvite(req.user.userId, body.email, body.permission);
  }

  @Get('invites')
  getInvites(@Request() req: UserRequest) {
    return this.sharedAccessService.getInvites(req.user.userId);
  }

  @Post('respond/:inviteId')
  respondToInvite(
    @Request() req: UserRequest,
    @Param('inviteId') inviteId: string,
    @Body() body: { accept: boolean },
  ) {
    return this.sharedAccessService.respondToInvite(inviteId, req.user.userId, body.accept);
  }

  @Get('shared-users')
  getSharedUsers(@Request() req: UserRequest) {
    return this.sharedAccessService.getSharedUsers(req.user.userId);
  }
}
