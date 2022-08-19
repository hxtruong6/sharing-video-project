import { Router } from 'express';
import bannerController from '../controllers/banner.controller';
import authMiddleware from '../middleware/authentication';

const videoRouter = Router();

videoRouter
// Get all no need to authentication - Can be divided into public or private router.
	.get('/:playlistSlug', bannerController.getAll)
	.get('/', bannerController.getAll)

// Other router need to check authentication user
	.all('/*', authMiddleware)
	.get('/list', bannerController.get)
	.post('/', bannerController.create)
	.put('/', bannerController.update);
// .delete('/:id', collectionController.remove)

export default videoRouter;
