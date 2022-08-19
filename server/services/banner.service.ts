import db from '../models';
import Tables from '../constants/schema';
import { convertSnakeKeys, convertCamelKeys } from '../utils/converts';

class BannerService {
	async getAll() {
		const banner = await db
			.from(Tables.banner)
			.returning('*')
			.then((r) => convertCamelKeys(r));

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
