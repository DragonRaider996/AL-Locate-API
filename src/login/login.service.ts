import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';

@Injectable()
export class LoginService {
  private userData: User;

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async validateUser(user: UserDTO): Promise<UserInterface> {
    this.userData = await this.userRepository.findOne({
      select: ["userId", "role"],
      where: { username: user.username, password: user.password }
    });
    return this.userData;
  }

  createToken(userData: UserInterface): string {
    const secret: string = process.env.SECRET;
    const token: string = sign({
      userId: userData.userId,
      role: userData.role
    }, secret, { expiresIn: "60d" });
    return token;
  }

}
