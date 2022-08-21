import { Router } from 'express';
import videoController from '../controllers/video.controller';
import authMiddleware from '../middleware/authentication';

const videoRouter = Router();

videoRouter
	// Get all no need to authentication - Can be divided into public or private router.
	.get('/public/:playlistUrl', videoController.getAll)
	.post('/public', videoController.getAll);

videoRouter

	// Other router need to check authentication user
	.all('/*', authMiddleware)
	.post('/list', videoController.getByUserId)
	.post('/', videoController.create)
	.put('/', videoController.update);
// .delete('/:id', videoController.remove)

export default videoRouter;
