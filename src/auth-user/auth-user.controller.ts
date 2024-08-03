import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { StatusRO } from 'src/libs/utils/interface';
import { RegisterDto } from './dto/register.dto';
import { ModuleName, Role } from 'src/libs/utils/enums';
import { LoginDto } from './dto/login.dto';
import { ListOfDataDto } from './dto/listOfData.dto';
import { Roles } from 'src/libs/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/libs/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/libs/services/auth/guard/roles.guard';
import { UpdateProfileDto } from './dto/editUser.dto';
import { UpdatePasswordDto } from './dto/resetPassword.dto';
import { SendOtpDto } from './dto/sendOtp.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { SendMailDto } from './dto/sendMail.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/fileUpload.dto';
import { storage } from 'src/libs/helper/multer';

@Controller('')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @ApiTags(ModuleName.user)
  @ApiOperation({ summary: 'Registration api' })
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<StatusRO> {
    return this.authUserService.register(registerDto);
  }

  @ApiTags(ModuleName.user)
  @ApiOperation({ summary: 'login api' })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<StatusRO> {
    return this.authUserService.login(loginDto);
  }

  @ApiTags(ModuleName.user)
  @ApiOperation({ summary: 'This Api list of data for sales users.' })
  @HttpCode(HttpStatus.OK)
  @Post('listUsers')
  listOfUsers(@Body() dto: ListOfDataDto): Promise<StatusRO> {
    return this.authUserService.listOfUsers(dto);
  }

  @ApiTags(ModuleName.user)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'view particular user profile' })
  @Get('viewProfile/:userId')
  @ApiParam({ example: 1, name: 'userId', required: true })
  viewProfile(@Param('userId') userId: number): Promise<StatusRO> {
    return this.authUserService.viewProfile(userId);
  }

  @ApiTags(ModuleName.user)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'This api is for update user profile' })
  @Put('updateProfile/:userId')
  @ApiParam({ example: 1, name: 'userId', required: true })
  updateProfile(
    @Param('userId') userId: number,
    @Body() dto: UpdateProfileDto,
  ): Promise<StatusRO> {
    return this.authUserService.updateProfile(dto, userId);
  }

  @ApiTags(ModuleName.user)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for delete user' })
  @Delete('deleteUser/:userId')
  @ApiParam({ example: 1, name: 'userId', required: true })
  deleteUser(@Param('userId') userId: number): Promise<StatusRO> {
    return this.authUserService.deleteUser(userId);
  }

  @ApiTags(ModuleName.user)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'This api is for update user password' })
  @ApiParam({ example: 1, name: 'userId', required: true })
  @Post('resetPassword/:userId')
  resetPassword(
    @Body() dto: UpdatePasswordDto,
    @Param('userId') userId: number,
  ): Promise<StatusRO> {
    return this.authUserService.resetPassword(dto, userId);
  }

  @ApiTags(ModuleName.user)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for send otp for forget password' })
  @Post('sendOtp')
  sendOtp(@Body() dto: SendOtpDto): Promise<StatusRO> {
    return this.authUserService.sendOtp(dto);
  }

  @ApiTags(ModuleName.user)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for send mail' })
  @Post('sendMail')
  sendMail(@Body() dto: SendMailDto): Promise<StatusRO> {
    return this.authUserService.sendMail(dto);
  }

  @ApiTags(ModuleName.user)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for verify otp for forget password' })
  @Post('verifyOtp')
  verifyOtp(@Body() dto: VerifyOtpDto): Promise<StatusRO> {
    return this.authUserService.verifyOtp(dto);
  }

  @ApiTags(ModuleName.user)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for change user password' })
  @Post('forgotPassword')
  forgotPassword(@Body() dto: ForgotPasswordDto): Promise<StatusRO> {
    return this.authUserService.forgotPassword(dto);
  }

  @ApiTags(ModuleName.cityList)
  @ApiOperation({ summary: 'This Api list of data for city.' })
  @HttpCode(HttpStatus.OK)
  @Post('listOfCity')
  listOfCity(@Body() dto: ListOfDataDto): Promise<StatusRO> {
    return this.authUserService.listOfCity(dto);
  }

  @ApiTags(ModuleName.stateList)
  @ApiOperation({ summary: 'This Api list of data for state.' })
  @HttpCode(HttpStatus.OK)
  @Post('listOfState')
  listOfState(@Body() dto: ListOfDataDto): Promise<StatusRO> {
    return this.authUserService.listOfState(dto);
  }

  @ApiTags(ModuleName.user)
  @ApiOperation({ summary: 'This is the common API for file uploads' })
  @HttpCode(HttpStatus.OK)
  @Post('/fileUploads')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 10 }], {
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB limit
      },
    }),
  )
  fileUploads(@Body() dto: FileUploadDto, @UploadedFiles() files: any) {
    return this.authUserService.uploadFiles(files);
  }
}
