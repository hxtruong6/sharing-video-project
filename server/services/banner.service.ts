import db from '../models';
import Tables from '../constants/schema';
import { convertSnakeKeys, convertCamelKeys } from '../utils/converts';
import fileService from './file.service';

class BannerService {
	async getAll() {
		const banner = await db
			.from(Tables.banner)
			.returning('*')
			.then((r) => convertCamelKeys(r));

		return banner;
	}

	async getBySlug(slug: string, hasImage: Boolean = false) {
		let banner = await db
			.from(Tables.banner)
			.where({ slug })
			.first()
			.then((r) => convertCamelKeys(r));

		if (hasImage) {
			const asyncFuncs: any = [];
			banner?.images?.forEach((img: number) => {
				if (img) asyncFuncs.push(fileService.getImageById(img));
				else asyncFuncs.push(null);
			});

			banner = {
				...banner,
				images: await Promise.all(asyncFuncs),
			};
		}

		return banner;
	}

	async create(params: any, userId: string) {
		const data = await db
			.from(Tables.banner)
			.insert(convertSnakeKeys({ ...params, createdBy: userId }))
			.returning('*');
		return data?.[0];
	}

	async update(params: any, userId: string) {
		const field = params?.slug ? 'slug' : 'id';
		if (!params[field]) throw new Error('Missing slug or id');

		const data = await db
			.from(Tables.banner)
			.where({ [field]: params[field] })
			.update(convertSnakeKeys({ ...params, updatedBy: userId }))
			.returning('*');
		return data?.[0];
	}
}

export default new BannerService();
