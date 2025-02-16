import { Controller, Post, Body, Patch, UseGuards, Req, UsePipes, ValidationPipe, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateProfile(@Req() req: Request, @Body() updateData: UpdateUserDto) {

    const userId = req.user!.id;

    return this.usersService.updateUser(userId, updateData);
  }

  @Get()
  async listUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.removeUser(id);
    return { message: 'Usuário removido com sucesso' }; 
  }

}
