import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { ICurrentUser } from '../common/types/current-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, password, role }: RegisterDto): Promise<any> {
    const existingUser = await this.userService.getUserByUsername(username);

    if (existingUser)
      throw new BadRequestException(`User ${username} already exists.`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      password: hashedPassword,
      role,
    };

    return this.userService.createUser(user);
  }

  login(user: ICurrentUser) {
    const payload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      user,
      accessToken,
    };
  }
}
