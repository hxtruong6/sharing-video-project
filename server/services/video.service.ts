import { Knex } from 'knex';
import Tables, { UserTable, VideoTable, VideoUserTable } from '../constants/schema';
import db from '../models';
import { copyObject, processPagination, toUrlString } from '../utils/commonFuncs';
import { convertCamelKeys, convertSnakeKeys } from '../utils/converts';
import videoUserService from './videoUser.service';

async function handleTotalLike(data) {
	const asyncFuncs: any = [];
	data?.forEach((video) => {
		asyncFuncs.push(videoUserService.getTotalLike(video.id));
	});

	const likeStatus = await Promise.all(asyncFuncs);
	const videos: any = data?.map((video, idx) => ({
		...video,
		likeStatus: likeStatus[idx],
	}));

	return videos;
}

async function handleShareByUser(data) {
	const asyncFuncs: any = [];
	data?.forEach((video) => {
		asyncFuncs.push(videoUserService.getUserByVideoId(video.id));
	});

	const sharedBy = await Promise.all(asyncFuncs);
	const videos: any = data?.map((video, idx) => ({
		...video,
		sharedBy: sharedBy[idx],
	}));

	return videos;
}

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

			.whereNull(`${Tables.video}.${VideoTable.deletedAt}`)
			.limit(limit)
			.offset(offset)
			.orderBy(`${Tables.video}.${VideoTable.createdAt}`)
			.select(
				'*'
				// db.raw(`TO_JSON(ARRAY_AGG(${Tables.videoUser})) as ${Tables.videoUser}s`)
			)
			.select(db.raw(`count(${Tables.video}.id) OVER() as total`))
			.then((r: any) => convertCamelKeys(r));

		let videos = await handleTotalLike(data);
		videos = await handleShareByUser(videos);

		return {
			perPage,
			page,
			total: data.length > 0 ? Number(data[0].total) : 0,
			videos: videos.map((item: any) => copyObject(item, ['total'])),
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
