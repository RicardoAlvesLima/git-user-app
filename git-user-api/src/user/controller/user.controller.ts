import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<any> {
    return this.service.save(user);
  }

  @Put()
  async update(@Body() user: User): Promise<any> {
    return this.service.save(user);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.service.delete(id);
  }
}
