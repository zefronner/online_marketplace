import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enum';

export class StatusAdminDto {
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
