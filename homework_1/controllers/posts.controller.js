import { PostsService } from "../services/posts.service.js";
import { postSchema } from "../schemas/posts.schema.js";
import { NotAllowed } from "../consts/errors.const.js";
import logger from '../services/logger.service.js';

export class PostsController {
    static async getAllPosts (req, res) {
        //req.session.userId is the actual id string of the user here - why?

        try {
            logger.emit('log', `User ${req.session.userId} evoked a GET method to get all posts from user with id: ${req.params.userId}.`);

            const posts = await PostsService.getAllPosts(req.params.userId);

            res.status(200).send(posts);
        }
        catch(error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async createPost (req, res) {
        try {
            logger.emit('log', `User ${req.session.userId} evoked a POST method to post a post.`)

            await postSchema.validateAsync(req.body, { abortEarly: false });

            const post = await PostsService.createPost(req.body, req.session.userId);

            res.status(201).send(post);
        }
        catch(error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async likePost (req, res) {
        try {
            logger.emit('log', `User ${req.session.userId} evoked a POST method to like a post with id: ${req.params.id}.`)

            await PostsService.likePost(req.params.id, req.session.userId);

            res.sendStatus(200);
        }
        catch(error) {
            if(error instanceof NotAllowed) res.status(403).send({ error: error.message });
            else res.status(500).send({ error: error.message });
        }
    }

    static async editPost (req, res) {
        try {
            logger.emit('log', `User ${req.session.userId} evoked a PUT method to edit a post with id: ${req.params.id}`);

            await postSchema.validateAsync(req.body, { abortEarly: false });

            const post = await PostsService.editPost(req.params.id, req.body, req.session.userId);

            res.status(200).send(post);
        }
        catch(error) {
            if(error instanceof NotAllowed) res.status(403).send({ error: error.message });
            else res.status(500).send({ error: error.message });
        }
    }
       
    static async deletePost (req, res) {
        try {
            logger.emit('log', `User ${req.session.userId} evoked a DELETE method to delete a post with id: ${req.params.id}`);

            await PostsService.deletePost(req.params.id, req.session.userId);

            res.sendStatus(204);
        }
        catch(error) {
            if(error instanceof NotAllowed) res.status(403).send({ error: error.message });
            else res.status(500).send({ error: error.message });
        }
    }
}