import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class LoginService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async validateUser(user: UserDTO): Promise<boolean> {
    user = await this.userRepository.findOne({
      where: { username: user.username, password: user.password }
    });
    if (user) {
      console.log(user)
      return true;
    } else {
      return false;
    }
  }

}
