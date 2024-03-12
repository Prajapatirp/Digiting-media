import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUser } from 'src/model/authUser.model';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/users.dto';
import { HandleResponse } from 'src/services/handleResponse';
import { ResponseData } from 'src/utils/response';
import { Messages } from 'src/utils/constants/message';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(AuthUser) private authUserModel: typeof AuthUser,
    private jwt: JwtService,
  ) {}

  async registration(dto: RegistrationDto, profileImage: Express.Multer.File) {
    let error = null;
    const saltRounds = 10;
    dto.password = await bcrypt.hash(dto.password, saltRounds);
    const registerUser = await this.authUserModel
      .create({ ...dto })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      let dbError: string;
      if (error.original.code === '23505') {
        dbError =
          'duplicate key value violates unique constraint Users_username_key';
      }
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.Error,
        `User ${Messages.ALREADY_EXIST}.`,
        dbError,
      );
    }

    if (registerUser && Object.keys(registerUser).length > 0) {
      return HandleResponse(
        HttpStatus.CREATED,
        ResponseData.Success,
        `Congratulation! You are ${Messages.REGISTERED_SUCCESS}!!!`,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.Error,
        Messages.NOT_FOUND,
      );
    }
  }

  async login(dto: LoginDto) {
    let error = null;
    const { email } = dto;

    const userLogin: any = await this.authUserModel
      .findOne({
        where: { email },
      })
      .catch((err: any) => {
        error = err;
      });

    const adminLogin: any = await this.authUserModel
      .findOne({
        where: { email },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseData.Error,
        `${Messages.FAILED_TO} login.`,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (!userLogin && !adminLogin) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.Error,
        Messages.USER_NOT_FOUND,
      );
    }

    const comparePassword = await bcrypt.compare(
      dto.password,
      userLogin ? userLogin.password : adminLogin.password,
    );

    if (comparePassword) {
      const token = await this.jwt.signAsync({
        id: userLogin ? userLogin.id : adminLogin.id,
        role: userLogin ? userLogin.role : adminLogin.role,
      });
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.Success,
        Messages.LOGIN_SUCCESS,
        { id: userLogin ? userLogin.id : adminLogin.id, token },
      );
    } else {
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.Error,
        Messages.DOES_NOT_MATCH,
      );
    }
  }
}
