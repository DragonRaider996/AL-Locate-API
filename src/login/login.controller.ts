import { Controller, Post, HttpStatus, Body, UnauthorizedException, HttpCode, HttpException } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserDTO } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';

@Controller('login')
export class LoginController {

  constructor(private readonly loginService: LoginService) { };

  @Post()
  @HttpCode(200)
  async login(@Body() userData: UserDTO): Promise<UserInterface> {
    const user: UserInterface = await this.loginService.validateUser(userData);
    if (user) {
      const token = this.loginService.createToken(user);
      user.token = token;
      return user;
    } else {
      throw new HttpException('Wrong username password', HttpStatus.UNAUTHORIZED);
    }
  }

}
