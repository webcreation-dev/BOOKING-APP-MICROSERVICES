import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth.module';
import { UsersSubscriber } from './subscribers/users.subscriber';
import { DatabaseModule, QueryingModule, UsualModule } from '@app/common';

@Module({
  imports: [
    DatabaseModule,
    UsualModule,
    DatabaseModule.forFeature([User]),
    forwardRef(() => AuthModule),
    QueryingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersSubscriber],
  exports: [UsersService],
})
export class UsersModule {}
