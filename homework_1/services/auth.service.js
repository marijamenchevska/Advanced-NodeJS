import User from '../models/users.model.js';
import { BadRequest } from '../consts/errors.const.js';
import bcrypt from 'bcrypt';

export class AuthService {
    static async register(userBody) {
        const { name, username, password } = userBody;

        const existingUser = await User.findOne({ username });

        if(existingUser) throw new BadRequest(`User ${username} already exists!`);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name, 
            username,
            password: hashedPassword,
        }

        const user = new User(newUser);

        const { _doc: { password: notNeededPassword, ...restOfUser } } = await user.save();

        return restOfUser;
    }

    static async login(userBody) {
        const { username, password } = userBody;

        const existingUser = await User.findOne({ username });

        if(!existingUser) throw new BadRequest('Username or password incorrect.');

        const matchingPasswords = await bcrypt.compare(password, existingUser.password);

        if(!matchingPasswords) throw new BadRequest('Username or password incorrect.');

        const { _doc: { password: notNeededPassword, ...restOfUser } } = existingUser;

        return restOfUser;
    }
}