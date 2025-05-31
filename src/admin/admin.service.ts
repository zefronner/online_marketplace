import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { handleError } from 'src/utils/catch-error';
import config from 'src/config';
import { encrypt } from 'src/utils/encrypt-decrypt';
import { Roles, Status } from 'src/enum';

@Injectable()
export class AdminService implements OnModuleInit{
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin 
  ) {}

  async onModuleInit(): Promise<void> {
    try { 
      const isSuperAdmin = await this.adminModel.findOne({ 
        where: { role: Roles.SUPERADMIN }
      });
      if( !isSuperAdmin ) {
        const hashedPassword = await encrypt(
          config.SUPERADMIN_PASSOWORD
        );
        await this.adminModel.create({
        username: config.SUPERADMIN_USERNAME,
        email: config.SUPERADMIN_EMAIL,
        hashed_password: hashedPassword,
        phone_number: config.SUPERADMIN_PHONE,
        role: Roles.SUPERADMIN,
        status: Status.ACTIVE
      });      
    }
    } catch(error) {
      return handleError(error);
    }
  };

  async createAdmin (createAdminDto: CreateAdminDto): Promise<object> {
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
      const admin = await this.adminModel.create({
        ...createAdminDto,
        hashed_password: hashedPassword,
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
  };

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  };

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if(!admin) {
      throw new NotFoundException('Id not found')
    }
    return admin;
  };

  async updateAdmin (id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminModel.update(
      updateAdminDto, 
      { where: { id }, returning: true }
    );
    return admin[1][0]
  };

  async removeAdmin (id: number) : Promise<object> {
    await this.adminModel.destroy({ where: { id }});
    return {
      message: 'Success'
    };
  };
}
