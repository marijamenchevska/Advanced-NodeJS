import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "src/auth/dtos/register.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getUserByUsername (username: string) {
        return this.userRepository.findOneBy({ username });
    }

    async createUser(credentials: RegisterDto) {
        const user = this.userRepository.create(credentials);
        const savedUser = await this.userRepository.save(user);
        delete savedUser.password;
        return savedUser;
    }
}