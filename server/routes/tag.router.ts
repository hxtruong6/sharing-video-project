import { Router } from 'express';
import tagController from '../controllers/tag.controller';
import authMiddleware from '../middleware/authentication';

const brandRouter = Router();

brandRouter
	.all('/*', authMiddleware)
	.post('/', tagController.create)
	.put('/', tagController.update)
	.delete('/:id', tagController.remove)
	.get('/', tagController.getAll)
	.get('/:id', tagController.getById);

export default brandRouter;
