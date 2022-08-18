import { Router } from 'express';
import bannerController from '../controllers/banner.controller';
import authMiddleware from '../middleware/authentication';

const bannerRouter = Router();

bannerRouter
	.all('/*', authMiddleware)
	.post('/', bannerController.create)
	.put('/', bannerController.update)
	// .delete('/:id', collectionController.remove)
	.get('/', bannerController.getAll)
	.get('/:slug', bannerController.get);

export default bannerRouter;
