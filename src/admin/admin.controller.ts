import { Controller, Get, Post,Res, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ConfirmSiginInAdminDto } from './dto/confirm-signin-admin.dto copy';
import { AuthGuard } from 'src/guards/auth.guard';
import { Response } from 'express';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Roles } from 'src/enum';
import { RolesGuard } from 'src/guards/roles.guard';

@UseInterceptors(CacheInterceptor)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Roles.SUPERADMIN)
  @Post()
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto
  ): Promise<object> {
    return this.adminService.createAdmin(createAdminDto)
  }

  @Post('signin')
  async signInAdmin (@Body() signInDto: CreateAdminDto) {
    return this.adminService.signInAdmin(signInDto);
  }

  @Post('confirm-signin')
  async confirmSignInAdmin (
    @Body() confirmSignInAdminDto: ConfirmSiginInAdminDto,
    @Res({ passthrough: true }) res: Response,) {
    return this.adminService.confirmSignInAdmin(confirmSignInAdminDto, res);
  }

  @Get()
  async findAll() {
    return this.adminService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.removeAdmin(+id);
  }
}