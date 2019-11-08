import { IsNotEmpty } from 'class-validator';

export class UserDTO {

  @IsNotEmpty()
  username: String;

  @IsNotEmpty()
  password: String;

}
