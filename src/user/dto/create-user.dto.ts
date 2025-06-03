export class CreateUserDto {
  name: string;
  email: string;
  role: 'customer' | 'admin'; 
}
