import { Controller, Get, Post,Res, Body, Patch, Param, Delete, UseInterceptors, UseGuards, ParseIntPipe } from '@nestjs/common';
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
import { GetCookie } from 'src/decorators/cookie.decorator';
import { SignInAdminDto } from './dto/signin-admin.dto';
import { SelfGuard } from 'src/guards/self.guard';
import { StatusAdminDto } from './dto/status-admin.dto';

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
  async signInAdmin (@Body() signInDto: SignInAdminDto) {
    return this.adminService.signInAdmin(signInDto);
  }

  @Post('confirm-signin')
  async confirmSignInAdmin (
    @Body() confirmSignInAdminDto: ConfirmSiginInAdminDto,
    @Res({ passthrough: true }) res: Response,) {
    return this.adminService.confirmSignInAdmin(confirmSignInAdminDto, res);
  }

  @Post('token')
  async refreshTokenAdmin(@GetCookie('refreshTokenAdmin') refreshToken: string){
    return this.adminService.refreshTokenAdmin(refreshToken);
  }

  @Post('signout')
  async signOutAdmin(
    @GetCookie('refreshTokenAdmin') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.signOutAdmin(refreshToken, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Roles.SUPERADMIN)
  @Get()
  async findAll() {
    return this.adminService.findAll();
  };

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Roles.SUPERADMIN)
  @Patch('status/:id')
  async activeDeactiveAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: StatusAdminDto,
  ) {
    return this.adminService.activeDeactiveAdmin(id, statusDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @CheckRoles(Roles.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Roles.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.removeAdmin(+id);
  }
}