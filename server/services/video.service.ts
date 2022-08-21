import Tables, { VideoTable } from '../constants/schema';
import db from '../models';
import { copyObject, processPagination, toUrlString } from '../utils/commonFuncs';
import { convertCamelKeys, convertSnakeKeys } from '../utils/converts';

class VideoService {
	getById(id: number) {
		return db
			.from(Tables.video)
			.where({ id })
			.whereNull(VideoTable.deletedAt)
			.first()
			.then((r: any) => convertCamelKeys(r));
	}

	getByUrl(url: string) {
		return db
			.from(Tables.video)
			.where({ url })
			.whereNull(VideoTable.deletedAt)
			.first()
			.then((r: any) => convertCamelKeys(r));
	}

	async getAll(params: any = {}) {
		const { page, perPage } = params;
		const { limit, offset } = processPagination(perPage, page);

		const data = await db
			.from(Tables.video)
			.whereNull(VideoTable.deletedAt)
			.limit(limit)
			.offset(offset)
			.orderBy(`${Tables.video}.${VideoTable.createdAt}`)
			.select('*')
			.select(db.raw(`count(${Tables.video}.id) OVER() as total`))
			.then((r: any) => convertCamelKeys(r));

		// console.log('xxx 300 data', data);

		return {
			perPage,
			page,
			total: data.length > 0 ? Number(data[0].total) : 0,
			videos: data.map((item: any) => copyObject(item, ['total'])),
		};
	}

	async create(video: any, userId: number) {
		const existedVideo = await this.getByUrl(video?.url);

		if (existedVideo) return existedVideo;

		const data = await db
			.from(Tables.video)
			.insert(convertSnakeKeys({ ...video, createdBy: userId }))
			.returning('*');
		return data?.[0];
	}

	async update(video: any, userId: number) {
		const data = await db
			.from(Tables.video)
			.where({ id: video.id })
			.update(convertSnakeKeys({ ...video, updatedBy: userId }))
			.returning('*');
		return data?.[0];
	}

	async remove(id: number, userId: number) {
		const data = await db
			.from(Tables.video)
			.where({ id })
			.update(convertSnakeKeys({ deletedAt: new Date(), deletedBy: userId }));
		return data === 1;
	}
}

export default new VideoService();
