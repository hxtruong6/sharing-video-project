import { Request, Response } from 'express';
import { ApiMessage } from '../constants/apiMessage';
import videoService from '../services/video.service';
import videoUserService from '../services/videoUser.service';
import { assertIRequest } from '../utils/commonFuncs';
import { convertCamelKeys } from '../utils/converts';
import { errorRes, failRes, successRes } from '../utils/standardResponse';

class VideoController {
	async getAll(req: Request, res: Response) {
		try {
			const { playlistUrl } = req.query;

			if (playlistUrl) {
				const data = await videoUserService.getByPlaylistUrl(playlistUrl);
				return successRes(res, convertCamelKeys(data));
			}

			const data = await videoService.getAll();
			return successRes(res, convertCamelKeys(data));
		} catch (error) {
			return errorRes(res, error);
		}
	}

	async getByUserId(req: Request, res: Response) {
		try {
			assertIRequest(req);
			const data = await videoUserService.getByUserId(req.userId);

			if (!data) {
				return failRes(res, { message: ApiMessage.NOT_FOUND });
			}
			return successRes(res, convertCamelKeys(data));
		} catch (error) {
			return errorRes(res, error);
		}
	}

	async create(req: Request, res: Response) {
		try {
			assertIRequest(req);
			const params = req.body;
			if (!params?.url) {
				return failRes(res, { message: ApiMessage.MISSING_URL });
			}

			const data = await videoService.create(params, req.userId);
			await videoUserService.create({ videoId: data?.id, userId: req.userId });

			if (!data) {
				return failRes(res, { message: ApiMessage.CREATE_FAILED });
			}
			return successRes(res, convertCamelKeys(data));
		} catch (error) {
			return errorRes(res, error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			assertIRequest(req);
			const params = req.body;
			const { likeAdd, isPublic } = params;

			if (!params?.id) {
				return failRes(res, { message: ApiMessage.MISSING_ID });
			}

			if (!likeAdd && (isPublic === null || isPublic === undefined)) {
				return failRes(res, { message: ApiMessage.MISSING_FIELD });
			}

			// TODO: it can split in to APIs which are like API and toggleIsPublic API.

			const data = await videoUserService.update(params, req.userId);
			if (!data) {
				return failRes(res, { message: ApiMessage.UPDATE_FAILED });
			}
			return successRes(res, convertCamelKeys(data));
		} catch (error) {
			return errorRes(res, error);
		}
	}
}
export default new VideoController();
