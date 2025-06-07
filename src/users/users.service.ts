import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { handleError } from 'src/utils/catch-error';
import { decrypt, encrypt } from 'src/utils/encrypt-decrypt';
import { UserRoles } from 'src/enum';
import { SignInUserDto } from './dto/signin-user.dto';
import { generateOTP } from 'src/utils/generate-otp';
import { MailService } from 'src/mail/mail.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfirmSiginInUserDto } from './dto/confirm-signin-user.dto';
import { TokenService } from 'src/utils/TokenService';
import { Response } from 'express';
import { FileService } from 'src/file/file.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly mailService: MailService,
    private readonly fileService: FileService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto, file?: Express.Multer.File,): Promise<object> {
    try {
      const {  email, password } = createUserDto;
      const existsEmail = await this.userModel.findOne({ where: { email } });
      if (existsEmail) {
        throw new ConflictException('Email address already exists');
      };
      const hashedPassword = await encrypt(password);
      let image: undefined | string;
      if (file) {
        image = await this.fileService.createFile(file);
      }
      const user = await this.userModel.create({
        ...createUserDto, 
        hashed_password: hashedPassword,
        image
      });

      return {
        statusCode: 201,
        message: 'success',
        data: user
      };

    } catch (error) {
      return handleError(error)
    }
  };

  async signInUser(signinUserDto: SignInUserDto) : Promise<object> {
    try {
      const { email, password } =  signinUserDto;
      const user = await this.userModel.findOne({ where: { email }});
      if(!user) {
        throw new BadRequestException('Eamil adress or passwrod incorrect');
      }
      const isMatchPassword = await decrypt(password, user.dataValues.hashed_password)
      if (!isMatchPassword) {
        throw new BadRequestException('Email or password incorrect');
      };
      const otp = generateOTP();
      await this.mailService.sendOTP(email, otp);
      await this.cacheManager.set(email, otp, 120000);
      return {
        statusCode: 201,
        message: 'success',
        data: `OTP sent to => ${email}`
      }
    } catch (error) {
      return handleError(error);
    }
  };

  async confirmSignInUser(confirmSignIn: ConfirmSiginInUserDto, res: Response): Promise<object> {
    try {
      const { email, otp } = confirmSignIn;
      const user = await this.userModel.findOne({ where: { email }});
      if(!user) {
        throw new BadRequestException('Wrong email adress');
      };
      const isTrueOtp = await this.cacheManager.get(email);
      if(!isTrueOtp || isTrueOtp != otp) {
        throw new BadRequestException('Otp expired');
      };
      const { id, role } = user?.dataValues;
      const payload = { id, role };
      const accessToken = await this.tokenService.generateAccessToken(payload);
      const refreshToken = await this.tokenService.generateRefreshToken(payload);
      await this.tokenService.writeToCookie(res, 'refreshTokenUser', refreshToken);
      return {
        statusCode: 200,
        message: 'success',
        data: accessToken
      }
    } catch (error) {
      return handleError(error);
    }
  };

  async refreshTokenUser(refreshToken: string) {
    const decodedToken =
      await this.tokenService.verifyRefreshToken(refreshToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Refresh token expired');
    };
    const user = await this.findUserById(decodedToken.id);
    const payload = {
      id: user.id,
      role: user.role
    };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    return {
      statusCode: 201,
      message: "Success",
      token: accessToken
    }
  };

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  };

  async findOne(id: number): Promise<User> {
    const user = await this.findUserById(id);
    return user;
  };

  async update(id: number, updateUserDto: UpdateUserDto, file?: Express.Multer.File,): Promise<User> {
    const user = await this.findUserById(id);
    let image = user.image;
    if (file) {
      if (image && (await this.fileService.existFile(image))) {
        await this.fileService.deleteFile(image);
      }
      image = await this.fileService.createFile(file);
    }
    const { email } = updateUserDto;
      if (email) {
        const existsEmail = await this.userModel.findOne({ where: { email } });
        if (id != existsEmail?.dataValues.id) {
          throw new ConflictException('Email address already exists');
        }
      }
    const updatedUser = await this.userModel.update(
      {
        ...updateUserDto,image
      },
      { where: { id }, returning: true }
    );
    return updatedUser[1][0]
  }

  async remove(id: number): Promise<object> {
    const user = await this.findUserById(id);
      if (user.image && (await this.fileService.existFile(user.image))) {
        await this.fileService.deleteFile(user.image);
      }
    await this.userModel.destroy({ where: { id }});
    return {
      message: "success"
    };
  };

  async findUserById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User not found by ID ${id}`);
    }
    return user.dataValues;
  }
}
