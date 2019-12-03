import { NestMiddleware, HttpException, HttpStatus, Request, Response, Next } from "@nestjs/common";
import { verify } from 'jsonwebtoken';

export class HospitalAuthenticationMiddleware implements NestMiddleware {

  use(@Request() req, @Response() res, @Next() next) {
    const authHeaders: string = req.headers.authorization;
    const secret: string = process.env.SECRET;
    if (authHeaders) {
      const token: string = authHeaders.split(" ")[1];
      try {
        const user: any = verify(token, secret);
        if (user.role === "hospital") {
          req.user = user;
          next();
        } else {
          throw new HttpException('Not Authorized', HttpStatus.BAD_REQUEST);
        }
      } catch (exception) {
        throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}