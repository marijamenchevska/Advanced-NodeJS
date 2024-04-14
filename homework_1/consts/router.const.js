import { Router } from 'express';
import authSession from './sessions.const.js';
import validateAuthSession from '../middleware/auth-validator.middleware.js';
import authRouter from '../routes/auth.route.js';
import postsRouter from '../routes/posts.route.js';

const router = Router();

router.use('/posts', authSession, validateAuthSession, postsRouter);
router.use('/auth', authSession, authRouter);

export default router;