import joi from 'joi';

export const userSchema = joi.object({
    name: joi.string().min(3).max(10),
    username: joi.string().min(3).max(15).required(),
    password: joi.string().min(8).required()
});