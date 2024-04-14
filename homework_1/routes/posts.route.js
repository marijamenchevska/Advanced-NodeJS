import { Router } from 'express';
import { PostsController } from '../controllers/posts.controller.js';

const router = Router();

router.get('/:userId', PostsController.getAllPosts);
router.post('', PostsController.createPost);
router.post('/:id/like', PostsController.likePost);
router.put('/:id', PostsController.editPost);
router.delete('/:id', PostsController.deletePost);

export default router;