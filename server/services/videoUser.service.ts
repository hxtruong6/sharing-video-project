import { ApiMessage } from '../constants/apiMessage';
import Tables, { UserTable, VideoTable, VideoUserTable } from '../constants/schema';
import db from '../models';
import { convertCamelKeys, convertSnakeKeys } from '../utils/converts';
import { failRes } from '../utils/standardResponse';
import userService from './user.service';

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

	async getByPlaylistUrl(url) {
		const user = await userService.getByPlaylistUrl(url);

		if (!user) return null;

		return db
			.from(Tables.videoUser)
			.join(
				Tables.video,
				`${Tables.video}.${VideoTable.id}`,
				`${Tables.videoUser}.${VideoUserTable.videoId}`
			)
			.where(VideoUserTable.isPublic, '=', true)
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

		const dbVideo = await this.getById(id);

		// Return if don't have videoUser item
		if (!dbVideo) return false;

		const { like, isPublic } = dbVideo;

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

	async getTotalLike(videoId: number) {
		const data = await db
			.from(Tables.videoUser)
			.where(convertSnakeKeys({ videoId }))
			.groupBy(`${Tables.videoUser}.${VideoUserTable.like}`)
			.select(`${VideoUserTable.like}`, db.raw('COUNT(*) as total'))
			.returning('*');

		// console.log('Total like: ', data);

		return data;
	}

	async getUserByVideoId(videoId: number) {
		const data = await db
			.from(Tables.videoUser)
			.join(
				Tables.user,
				`${Tables.user}.${UserTable.id}`,
				`${Tables.videoUser}.${VideoUserTable.userId}`
			)
			.where(convertSnakeKeys({ videoId }))
			.select(
				`${Tables.videoUser}.id as video_user_id`,
				`${Tables.videoUser}.like as like`,
				`${Tables.user}.id as user_id`,
				`${Tables.user}.user_name as user_name`
			)
			.then((r) => convertCamelKeys(r));

		return data;
	}
}

export default new VideoUserService();
