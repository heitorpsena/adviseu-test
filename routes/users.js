import { Router } from 'express';
import { getUsers, getUser, createUser } from '../controllers/users.js';

const router = Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser);

export default router;
