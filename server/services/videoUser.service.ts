import Tables, { VideoTable, VideoUserTable } from '../constants/schema';
import db from '../models';
import { convertCamelKeys, convertSnakeKeys } from '../utils/converts';

class VideoUserService {
	getByUserId(userId: number) {
		return db
			.from(Tables.videoUser)
			.join(
				Tables.video,
				`${Tables.video}.${VideoTable.id}`,
				`${Tables.videoUser}.${VideoUserTable.videoId}`
			)
			.where(VideoUserTable.userId, '=', userId)
			.select(
				`${Tables.videoUser}.*`,
				`${Tables.video}.name as name`,
				`${Tables.video}.url as url`,
				`${Tables.video}.description as description`
			)
			.then((r) => convertCamelKeys(r));
	}

	async create({ videoId, userId }) {
		const data = await db
			.from(Tables.videoUser)
			.insert(
				convertSnakeKeys({ videoId, userId, createdBy: userId })
			)
			.returning('*');
		return data?.[0];
	}
}

export default new VideoUserService();
