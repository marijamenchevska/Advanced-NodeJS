import joi from 'joi';

export const postSchema = joi.object({
    title: joi.string().max(50).required(),
    content: joi.string().max(2500).required()
});