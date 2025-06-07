import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ConfirmSiginInUserDto } from './dto/confirm-signin-user.dto';
import { Response } from 'express';
import { GetCookie } from 'src/decorators/cookie.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValiationPipe } from 'src/pipes/image-validation.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body() createUserDto: CreateUserDto,
  @UploadedFile( new ImageValiationPipe) file?: Express.Multer.File
  ) {
    return this.usersService.create(createUserDto, file);
  }

  @Post('signin')
  async signInUser (@Body() signInDto: SignInUserDto) {
    return this.usersService.signInUser(signInDto);
  };

  @Post('confirm-signin')
  async confirmSignInAdmin(
    @Body() confirmSignInUserDto: ConfirmSiginInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.confirmSignInUser(confirmSignInUserDto, res);
  };

  @Post('token')
  async refreshTokenUser(@GetCookie('refreshTokenUser') refreshToken: string,
  @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.refreshTokenUser(refreshToken);
  };

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
