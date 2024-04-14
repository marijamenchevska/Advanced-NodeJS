import { BadRequest } from "../consts/errors.const.js";
import { AuthService } from "../services/auth.service.js";
import { userSchema } from "../schemas/users.schema.js";
import logger from '../services/logger.service.js';

export class AuthController {
    static async register(req, res) {
        try {
            logger.emit('log', `A user with username ${req.body.username} evoked a POST method to register.`);

            await userSchema.validateAsync(req.body, { abortEarly: false });

            const user = await AuthService.register(req.body);

            res.status(201).send(user);
        }
        catch(error) {
            if(error instanceof BadRequest) res.status(400).send({ error: error.message });
            else res.status(500).send({ error: error.message });
        }
    }

    static async login (req, res) {
        try {
            logger.emit('log', `A user with username ${req.body.username} evoked a POST method to log in.`);

            const user = await AuthService.login(req.body);

            req.session.isLoggedIn = true;
            req.session.userId = user._id; // this is new ObjectId

            res.status(200).send(user);
        }
        catch(error) {
            if (error instanceof BadRequest) res.status(404).send({ error: error.message });
            else res.status(500).send({ error: error.message });
        }
    }

    static async logout (req, res) {
        try {
            logger.emit('log', `A user with id ${req.session.userId} evoked a POST method to log out.`);

            req.session.isLoggedIn = false;
            req.userId = null;

            res.sendStatus(204);
        }
        catch(error) {
            res.status(500).send({ error: error.message });
        }
    }
}