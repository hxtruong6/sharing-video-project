import Tables, { TagTable } from '../constants/schema';
import db from '../models';
import { toUrlString } from '../utils/commonFuncs';
import { convertSnakeKeys } from '../utils/converts';

class TagService {
	getById(id: number) {
		return db.from(Tables.tag).where({ id }).whereNull(TagTable.deletedAt).first();
	}

	getAll() {
		return db.from(Tables.tag).select().whereNull(TagTable.deletedAt).orderBy(`${Tables.tag}.id`);
	}

	async create(tag: any, userId: number) {
		const data = await db
			.from(Tables.tag)
			.insert(
				convertSnakeKeys({ ...tag, slug: toUrlString(tag?.name), createdBy: userId })
			)
			.returning('*');
		return data?.[0];
	}

	async update(tag: any, userId: number) {
		const data = await db
			.from(Tables.tag)
			.where({ id: tag.id })
			.update(convertSnakeKeys({ ...tag, updatedBy: userId }))
			.returning('*');
		return data?.[0];
	}

	async remove(id: number, userId: number) {
		const data = await db
			.from(Tables.tag)
			.where({ id })
			.update(convertSnakeKeys({ deletedAt: new Date(), deletedBy: userId }));
		return data === 1;
	}
}

export default new TagService();
