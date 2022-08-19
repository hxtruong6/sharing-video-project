import express, { Express, Request, Response } from 'express';
import { ApiMessage } from '../constants/apiMessage';
import { errorRes } from '../utils/standardResponse';

import userRouter from './user.router';
// import videoRouter from './video.router';

export default (app: Express) => {
	app.get('/', (req: Request, res: Response) => {
		res.send('🛑 API 🛑- Be carefully with virus in api!!! 🛑🚫☣️🚫');
	});

	// Public
	// http://localhost:8084/public/file/products/SP002404.png

	// Private
	// TODO: Add validator req from router (fastest-validator)
	app.use('/api/user', userRouter);
	// app.use('/api/video', videoRouter);

	app.use('*', (req: Request, res: Response) => {
		errorRes(res, { message: ApiMessage.ROUTE_NOT_FOUND });
	});
};
