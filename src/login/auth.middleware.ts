import { NestMiddleware, HttpException, HttpStatus } from "@nestjs/common";
import { verify } from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";

export class AuthenticationMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const authHeaders: string = req.headers.authorization;
    const secret: string = process.env.SECRET;
    if (authHeaders) {
      const token: string = authHeaders.split(" ")[1];
      try {
        const user: any = verify(token, secret);
        if (user) {
          req.query.user = user;
          next();
        } else {
          throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
      } catch (exception) {
        throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
  }


}