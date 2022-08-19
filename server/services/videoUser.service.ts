import { ApiMessage } from '../constants/apiMessage';
import Tables, { VideoTable, VideoUserTable } from '../constants/schema';
import db from '../models';
import { convertCamelKeys, convertSnakeKeys } from '../utils/converts';
import { failRes } from '../utils/standardResponse';

class VideoUserService {
	getById(id: number) {
		return db
			.from(Tables.videoUser)
			.where({ id })
			.whereNull(VideoTable.deletedAt)
			.first()
			.then((r) => convertCamelKeys(r));
	}

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
			.insert(convertSnakeKeys({ videoId, userId, createdBy: userId }))
			.returning('*');
		return data?.[0];
	}

	async update(video: any, userId: number) {
		const { likeAdd } = video;
		let { id } = video;
		id = Number(id);

		// console.log(video);

		const dbVideo = await this.getById(id);

		// Return if don't have videoUser item
		if (!dbVideo) return false;

		const { like, isPublic } = dbVideo;

		// console.log(dbVideo);

		if (likeAdd) {
			const caculatedLike = Math.min(Math.max(like + likeAdd, -1), 1);

			const data = await db
				.from(Tables.videoUser)
				.where({ id })
				.update(convertSnakeKeys({ like: caculatedLike, updatedBy: userId }))
				.returning('*');
			return data?.[0];
		}

		const data = await db
			.from(Tables.videoUser)
			.where({ id })
			.update(convertSnakeKeys({ isPublic: !isPublic, updatedBy: userId }))
			.returning('*');
		return data?.[0];
	}
}

export default new VideoUserService();
