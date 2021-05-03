import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { Git } from './model/git.entity';
import { Address } from './model/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Git, Address])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
