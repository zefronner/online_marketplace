import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { handleError } from 'src/utils/catch-error';
import config from 'src/config';
import { encrypt, decrypt } from 'src/utils/encrypt-decrypt';
import { Roles, Status } from 'src/enum';
import { generateOTP } from 'src/utils/generate-otp';
import { MailService } from 'src/mail/mail.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfirmSiginInAdminDto } from './dto/confirm-signin-admin.dto copy';
import { TokenService } from 'src/utils/TokenService';
import { Response } from 'express';
import { SignInAdminDto } from './dto/signin-admin.dto';
import { StatusAdminDto } from './dto/status-admin.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tokenService: TokenService,
    private readonly fileService: FileService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const isSuperAdmin = await this.adminModel.findOne({
        where: { role: Roles.SUPERADMIN },
      });
      if (!isSuperAdmin) {
        const hashedPassword = await encrypt(config.SUPERADMIN_PASSOWORD);
        await this.adminModel.create({
          username: config.SUPERADMIN_USERNAME,
          email: config.SUPERADMIN_EMAIL,
          hashed_password: hashedPassword,
          phone_number: config.SUPERADMIN_PHONE,
          role: Roles.SUPERADMIN,
          status: Status.ACTIVE,
        });
      }
    } catch (error) {
      return handleError(error);
    }
  }

  async createAdmin(
    createAdminDto: CreateAdminDto,
    file: Express.Multer.File,
  ): Promise<object> {
    try {
      const { email, phone_number, password } = createAdminDto;
      const existsEmail = await this.adminModel.findOne({ where: { email } });
      if (existsEmail) {
        throw new ConflictException('Email address already exists');
      }
      const existsPhone = await this.adminModel.findOne({
        where: { phone_number },
      });
      if (existsPhone) {
        throw new ConflictException('Phone number already exists');
      }
      const hashedPassword = await encrypt(password);
      let image: undefined | string;
      if (file) {
        image = await this.fileService.createFile(file);
      }

      const admin = await this.adminModel.create({
        ...createAdminDto,
        hashed_password: hashedPassword,
        image,
        role: Roles.ADMIN,
      });
      return {
        statusCode: 201,
        message: 'success',
        data: admin,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async signInAdmin(SignInDto: SignInAdminDto): Promise<object> {
    try {
      const { email, password } = SignInDto;
      const admin = await this.adminModel.findOne({ where: { email } });
      if (!admin) {
        throw new BadRequestException('Eamil adress or passwrod incorrect');
      }
      const isMatchPassword = await decrypt(
        password,
        admin.dataValues.hashed_password,
      );
      if (!isMatchPassword) {
        throw new BadRequestException('Email or password incorrect');
      }
      const otp = generateOTP();
      await this.mailService.sendOTP(email, otp);
      await this.cacheManager.set(email, otp, 120000);
      return {
        statusCode: 201,
        message: 'success',
        data: email,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async confirmSignInAdmin(
    confirmSignInAdminDto: ConfirmSiginInAdminDto,
    res: Response,
  ) {
    try {
      const { email, otp } = confirmSignInAdminDto;
      const admin = await this.adminModel.findOne({ where: { email } });
      if (!admin) {
        throw new BadRequestException('Wrong email adress');
      }
      const isTrueOtp = await this.cacheManager.get(email);
      if (!isTrueOtp || isTrueOtp != otp) {
        throw new BadRequestException('Otp expired');
      }
      const { id, role } = admin?.dataValues;
      const activeAdmin = await this.adminModel.update(
        { status: Status.ACTIVE },
        {
          where: { id },
          returning: true,
        },
      );
      const payload = {
        id,
        status: activeAdmin[1][0]?.dataValues?.status,
        role,
      };
      const accessToken = await this.tokenService.generateAccessToken(payload);
      const refreshToken =
        await this.tokenService.generateRefreshToken(payload);
      await this.tokenService.writeToCookie(
        res,
        'refreshTokenAdmin',
        refreshToken,
      );
      return {
        statusCode: 200,
        message: 'success',
        data: accessToken,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async refreshTokenAdmin(refreshToken: string) {
    const decodedToken =
      await this.tokenService.verifyRefreshToken(refreshToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Refresh token expired');
    }
    const admin = await this.findAdminById(decodedToken.id);
    const payload = {
      id: admin.id,
      role: admin.role,
      status: admin.status,
    };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    return {
      statusCode: 201,
      message: 'Success',
      token: accessToken,
    };
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    try {
      const decodedToken =
        await this.tokenService.verifyRefreshToken(refreshToken);
      if (!decodedToken) {
        throw new UnauthorizedException('Refresh token expired');
      }
      await this.findAdminById(decodedToken.id);
      res.clearCookie('refreshTokenAdmin');
      return {
        statusCode: 201,
        message: 'Admin signed out successfully',
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async activeDeactiveAdmin(
    id: number,
    statusDto: StatusAdminDto,
  ): Promise<object> {
    try {
      await this.findAdminById(id);
      const updatedAdmin = await this.adminModel.update(
        {
          status: statusDto.status,
        },
        { where: { id }, returning: true },
      );
      return {
        statusCode: 201,
        message: 'success',
        data: updatedAdmin[1][0],
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Id not found');
    }
    return admin;
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const { email } = updateAdminDto;
    if (email) {
      const existsEmail = await this.adminModel.findOne({ where: { email } });
      if (id != existsEmail?.dataValues.id) {
        throw new ConflictException('Email address already exists');
      }
    }
    const admin = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return admin[1][0];
  }

  async removeAdmin(id: number): Promise<object> {
    await this.adminModel.destroy({ where: { id } });
    return {
      message: 'Success',
    };
  }

  async findAdminById(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin not found by ID ${id}`);
    }
    return admin.dataValues;
  }
}
