import { Controller, Post, Body, UploadedFile, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegistrationDto } from './dto/users.dto';
import { LoginDto } from './dto/login.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/services/multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage', { storage: storage }))
  registration(@Body() dto: RegistrationDto, 
  @UploadedFile() profileImage: Express.Multer.File
  ) {
    return this.usersService.registration(dto, profileImage);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }
}
