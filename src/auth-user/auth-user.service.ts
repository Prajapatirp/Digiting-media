import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { DbService } from 'src/libs/services/db.service';
import { AuthUser } from 'src/models/authUser.model';
import { RegisterDto } from './dto/register.dto';
import { StatusRO } from 'src/libs/utils/interface';
import * as bcrypt from 'bcrypt';
import { HandleResponse } from 'src/libs/helper/handleResponse';
import { Messages } from 'src/libs/utils/message';
import { ResponseData, Role } from 'src/libs/utils/enums';
import { LoginDto } from './dto/login.dto';
import { ListOfDataDto } from './dto/listOfData.dto';
import { City } from 'src/models/city.model';
import { State } from 'src/models/state.model';
import { UpdateProfileDto } from './dto/editUser.dto';
import { UpdatePasswordDto } from './dto/resetPassword.dto';
import { SendOtpDto } from './dto/sendOtp.dto';
import * as moment from 'moment';
import { Otp } from 'src/models/otp.model';
import { otpSend } from 'src/libs/helper/sendEmail';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { generateRandomOtp } from '../libs/helper/commonFunction/commonFunctions';
import { Op } from 'sequelize';
import { Package } from 'src/models/package.model';
import { SendMailDto } from './dto/sendMail.dto';
export interface FileUploadsData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

@Injectable()
export class AuthUserService {
  constructor(
    @InjectModel(AuthUser) private authUserModel: typeof AuthUser,
    @InjectModel(City) private CityModel: typeof City,
    @InjectModel(State) private StateModel: typeof State,
    @InjectModel(Otp) private OtpModel: typeof Otp,
    @InjectModel(Package) private ServiceModel: typeof Package,
    private jwt: JwtService,
    private dbService: DbService,
  ) {}

  async register(registerDto: RegisterDto): Promise<StatusRO> {
    RegisterDto.validatePasswordRequirement(registerDto);
    const {
      password,
      contactNo,
      email,
      name,
      state,
      city,
      address,
      role,
      zipCode,
      designation,
    } = registerDto;
    const saltRounds: number = 10;

    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : null;

    const addUser = {
      name,
      email,
      password: hashedPassword,
      role,
      contact_no: contactNo,
      address,
      zip_code: zipCode,
      state,
      city,
      designation,
    };

    await this.dbService.create(
      this.authUserModel,
      addUser,
      null,
      {
        uniqueField: 'contact_no',
        message: `User is ${Messages.ALREADY_REGISTERED} with ${contactNo}.`,
      },
    );

    Logger.log(`Stack holder is ${Messages.ADD_SUCCESS}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Stack holder is ${Messages.ADD_SUCCESS}`,
      undefined,
      undefined,
    );
  }

  async login(loginDto: LoginDto) {
    const { contactNo, password } = loginDto;
    let role = [Role.Admin, Role.Dealer];

    const findUser: AuthUser = await this.dbService.findOne(
      this.authUserModel,
      { contact_no: contactNo, role },
      null,
      { message: Messages.USER_NOT_FOUND },
    );

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      findUser.password,
    );

    if (!isPasswordValid) {
      Logger.error(`Credentials ${Messages.DOES_NOT_MATCH}`);
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.ERROR,
        `Credentials ${Messages.DOES_NOT_MATCH}`,
        undefined,
        undefined,
      );
    } else {
      const token: string = this.jwt.sign({
        id: findUser.id,
        role: findUser.role,
        name: findUser.first_name,
        firstName: findUser.last_name,
        lastNAme: findUser.middle_name,
      });

      Logger.log(Messages.LOGIN_SUCCESS);
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        `${findUser.role} ${Messages.LOGIN_SUCCESS}`,
        { token },
        undefined,
      );
    }
  }

  async listOfCity(dto: ListOfDataDto): Promise<StatusRO> {
    const stateInclude: any[] = [
      {
        model: this.StateModel,
        attributes: ['state_name'],
      },
    ];

    const listOfCity: any[] = await this.dbService.findAll(
      this.CityModel,
      {
        exclude: ['createdAt', 'updatedAt'],
        ...(dto.selectionCriteria ?? {}),
      },
      {
        ...(dto.condition ?? {}),
      },
      [['createdAt', 'DESC']],
      stateInclude,
      { message: Messages.NOT_FOUND },
    );

    Logger.log(`List of cities ${Messages.GET_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      undefined,
      listOfCity,
      undefined,
    );
  }

  async listOfState(dto: ListOfDataDto): Promise<StatusRO> {
    const findState: any[] = await this.dbService.findAll(
      this.StateModel,
      {
        exclude: ['createdAt', 'updatedAt'],
        ...(dto.selectionCriteria ?? {}),
      },
      {
        ...(dto.condition ?? {}),
      },
      [['createdAt', 'DESC']],
      null,
      { message: Messages.NOT_FOUND },
    );

    Logger.log(`List of state ${Messages.GET_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      undefined,
      findState,
      undefined,
    );
  }

  async viewProfile(userId: number): Promise<StatusRO> {
    const findUser: AuthUser = await this.dbService.findOne(
      this.authUserModel,
      { id: userId },
      [
        'name',
        'email',
        'contact_no',
        'address',
        'city',
        'state',
        'zip_code',
        'profile_image',
      ],
      { message: `User ${Messages.NOT_FOUND}` },
      null,
      null,
      true,
    );

    Logger.log(`User details ${Messages.GET_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      undefined,
      findUser,
      undefined,
    );
  }

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    userId: number,
  ): Promise<StatusRO> {
    const {
      name,
      contactNo,
      address,
      city,
      state,
      zipCode,
      role,
      email,
      designation,
      profile_image,
    } = updateProfileDto;

    const updateProfileData = {
      name,
      contact_no: contactNo,
      address,
      zip_code: zipCode,
      state,
      city,
      designation,
      role,
      email,
      profile_image,
    };

    await this.dbService.update(
      this.authUserModel,
      updateProfileData,
      { id: userId },
      null,
      { message: Messages.NOT_FOUND },
      true,
    );

    Logger.log(`Stack holder is ${Messages.UPDATE_SUCCESS}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Stack holder is ${Messages.UPDATE_SUCCESS}`,
      undefined,
      undefined,
    );
  }

  async deleteUser(userId: number): Promise<StatusRO> {
    await this.dbService.update(
      this.authUserModel,
      { is_deleted: true },
      { id: userId },
      null,
      { message: Messages.NOT_FOUND },
    );

    Logger.log(`Stack holder is ${Messages.DELETE_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Stack holder is ${Messages.DELETE_SUCCESS}`,
      undefined,
      undefined,
    );
  }

  async resetPassword(
    updatedPasswordDto: UpdatePasswordDto,
    userId: number,
  ): Promise<StatusRO> {
    const { currentPassword, newPassword } = updatedPasswordDto;

    const existingUser: AuthUser = await this.dbService.findOne(
      this.authUserModel,
      { id: userId },
      null,
      { message: Messages.USER_NOT_FOUND },
      null,
      null,
      true,
    );

    const validPassword: any = await bcrypt.compare(
      currentPassword,
      existingUser.password,
    );

    if (validPassword) {
      const saltRounds = 10;
      const bcryptPassword: any = await bcrypt.hash(newPassword, saltRounds);

      await this.dbService.update(
        this.authUserModel,
        { password: bcryptPassword },
        { id: existingUser.id },
        null,
        { message: Messages.UPDATE_FAILED },
      );

      Logger.log(`Your password is ${Messages.UPDATE_SUCCESS}`);
      return HandleResponse(
        HttpStatus.ACCEPTED,
        ResponseData.SUCCESS,
        `Your password is ${Messages.UPDATE_SUCCESS}`,
        undefined,
        undefined,
      );
    } else {
      Logger.error(Messages.INCORRECT_PASSWORD);
      return HandleResponse(
        HttpStatus.NOT_ACCEPTABLE,
        ResponseData.ERROR,
        Messages.INCORRECT_PASSWORD,
        undefined,
        undefined,
      );
    }
  }

  async sendOtp(dto: SendOtpDto) {
    const { email } = dto;
    const generateOtp: number = generateRandomOtp(100000, 999999);

    await this.dbService.findOne(
      this.authUserModel,
      { email },
      null,
      { message: Messages.EMAIL_INCORRECT },
      null,
      null,
      true,
    );

    const expireDate: any = moment().add(5, 'minute').format();

    const otpHtml = `<h3>OTP for new password is </h3><h1 style="font-weight:bold;">${generateOtp}</h1>`;
    otpSend(email, otpHtml);

    const otpData = {
      otp: generateOtp,
      email,
      expiration_time: expireDate,
    };

    await this.dbService.create(
      this.OtpModel,
      otpData,
    );

    Logger.log(`Your OTP is ${Messages.SEND_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Your OTP is ${Messages.SEND_SUCCESS}`,
      { otp: generateOtp },
      undefined,
    );
  }

  async sendMail(dto: SendMailDto) {
    const { email, subject, message } = dto;

    const otpHtml = message ?? `<h1>Test mail</h1>`;

    otpSend(email, otpHtml, subject);

    Logger.log(`Your OTP is ${Messages.SEND_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Mail is ${Messages.SEND_SUCCESS}`,
      undefined,
      undefined,
    );
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const { email, otp } = dto;

    const findOtp: any = await this.dbService.findOne(
      this.OtpModel,
      {
        email,
        otp,
        expiration_time: {
          [Op.gt]: new Date(),
        },
      },
      null,
      { message: Messages.ENTER_CORRECT_OTP },
    );

    const currentTime = new Date();
    const expirationTime = new Date(findOtp.expiration_time);

    if (expirationTime < currentTime) {
      Logger.log(Messages.OTP_EXPIRED);
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.ERROR,
        Messages.OTP_EXPIRED,
        undefined,
        undefined,
      );
    } else {
      await this.dbService.destroy(this.OtpModel, {
        otp: findOtp.otp,
        email: findOtp.email,
      });

      Logger.log(Messages.OTP_VERIFIED);
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        Messages.OTP_VERIFIED,
        undefined,
        undefined,
      );
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const { email, newPassword } = dto;

    const existingUser: AuthUser = await this.dbService.findOne(
      this.authUserModel,
      { email },
      null,
      { message: Messages.EMAIL_INCORRECT },
    );

    const saltRounds: number = 10;
    const bcryptPassword: any = await bcrypt.hash(newPassword, saltRounds);

    await this.dbService.update(
      this.authUserModel,
      { password: bcryptPassword },
      { id: existingUser.id },
      null,
      { message: Messages.UPDATE_FAILED },
    );

    Logger.log(`Your password is ${Messages.UPDATE_SUCCESS}`);
    return HandleResponse(
      HttpStatus.ACCEPTED,
      ResponseData.SUCCESS,
      `Your password is ${Messages.UPDATE_SUCCESS}`,
      undefined,
      undefined,
    );
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const filesUploadsDetails = files['files'].map(
      (file: { filename: FileUploadsData[] }) => file.filename,
    );

    if (filesUploadsDetails && filesUploadsDetails.length > 0) {
      Logger.log(`Files ${Messages.ADD_SUCCESS}`);
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        undefined,
        filesUploadsDetails,
        undefined,
      );
    } else {
      Logger.error(Messages.NOT_FOUND);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }
}
