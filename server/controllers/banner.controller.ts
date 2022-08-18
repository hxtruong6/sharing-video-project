import { Request, Response } from 'express';
import { ApiMessage } from '../constants/apiMessage';
import bannerService from '../services/banner.service';
import { assertIRequest } from '../utils/commonFuncs';
import { convertCamelKeys } from '../utils/converts';
import { errorRes, failRes, successRes } from '../utils/standardResponse';

class BannerController {
	async getAll(req: Request, res: Response) {
		try {
			const data = await bannerService.getAll();
			return successRes(res, convertCamelKeys(data));
		} catch (error) {
			return errorRes(res, error);
		}
	}

	async get(req: Request, res: Response) {
		try {
			const { slug } = req.params;
			if (!slug) {
				return failRes(res, { message: ApiMessage.BAD_REQUEST });
			}

			const data = await bannerService.getBySlug(slug);
			if (!data) {
				return failRes(res, { message: ApiMessage.NOT_FOUND });
			}
			return successRes(res, convertCamelKeys(data));
		} catch (error) {
			return errorRes(res, error);
		}
	}

	async getPl(req: Request, res: Response) {
		try {
			const { slug } = req.params;
			if (!slug) {
				return failRes(res, { message: ApiMessage.BAD_REQUEST });
			}

			const data = await bannerService.getBySlug(slug, true);
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

			const data = await bannerService.create(params, req.userId);
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
			if (!params || (!params.id && !params.slug)) {
				return failRes(res, { message: ApiMessage.MISSING_ID });
			}

			const data = await bannerService.update(params, req.userId);
			if (!data) {
				return failRes(res, { message: ApiMessage.UPDATE_FAILED });
			}
			return successRes(res, convertCamelKeys(data));
		} catch (error) {
			return errorRes(res, error);
		}
	}
}
export default new BannerController();
