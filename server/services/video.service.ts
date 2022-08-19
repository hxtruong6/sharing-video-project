import Tables, { VideoTable } from '../constants/schema';
import db from '../models';
import { toUrlString } from '../utils/commonFuncs';
import { convertSnakeKeys } from '../utils/converts';

class VideoService {
	getById(id: number) {
		return db.from(Tables.video).where({ id }).whereNull(VideoTable.deletedAt).first();
	}

	getAll() {
		return db.from(Tables.video).select().whereNull(VideoTable.deletedAt).orderBy(`${Tables.video}.${VideoTable.createdAt}`);
	}

	async create(video: any, userId: number) {
		const data = await db
			.from(Tables.video)
			.insert(
				convertSnakeKeys({ ...video, slug: toUrlString(video?.name), createdBy: userId })
			)
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
