import express, { Express, Request, Response } from 'express';
import { ApiMessage } from '../constants/apiMessage';
import { UploadImageFolder } from '../constants/constants';
import { errorRes } from '../utils/standardResponse';

import userRouter from './user.router';

import bannerRouter from './banner.router';
import tagRouter from './tag.router';

export default (app: Express) => {
	app.get('/', (req: Request, res: Response) => {
		res.send('🛑 HD API 🛑- Be carefully with virus in api!!! 🛑🚫☣️🚫');
	});

	// Public
	// http://localhost:8084/public/file/products/SP002404.png
	app.use('/public/file', express.static(UploadImageFolder));
	app.use('/api/file', express.static(UploadImageFolder));

	// Private

	// TODO: Add validator req from router (fastest-validator)
	app.use('/api/user', userRouter);
	app.use('/api/banner', bannerRouter);
	app.use('/api/tag', tagRouter);

	app.use('*', (req: Request, res: Response) => {
		errorRes(res, { message: ApiMessage.ROUTE_NOT_FOUND });
	});
};
