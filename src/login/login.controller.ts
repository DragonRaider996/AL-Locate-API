import { Controller, Post, HttpStatus, Body, UnauthorizedException, HttpCode } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserDTO } from './dto/user.dto';

@Controller('login')
export class LoginController {

  constructor(private readonly loginService: LoginService) { };

  @Post()
  @HttpCode(200)
  async login(@Body() userData: UserDTO) {
    if (await this.loginService.validateUser(userData)) {
      return;
    } else {
      throw new UnauthorizedException();
    }
  }

}
