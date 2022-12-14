import Tables, { UserTable } from '../constants/schema';
import db from '../models';
import { filtered } from '../utils/commonFuncs';
import { convertCamelKeys, convertSnakeKeys } from '../utils/converts';

class UserService {
	async getByUserName(userName: string, requirePassword: Boolean = false) {
		const data = await db
			.from(Tables.user)
			.where({ user_name: userName })
			.whereNull(UserTable.deletedAt)
			.then((data: any) => convertCamelKeys(data));

		if (data.length !== 1) {
			return null;
		}

		if (requirePassword) return data[0];

		return filtered(data[0], { excepted: ['password'] });
	}

	async getById(id: number) {
		const data = await db
			.from(Tables.user)
			.where({ id })
			.whereNull(UserTable.deletedAt)
			.then((data: any) => convertCamelKeys(data));

		if (data.length !== 1) {
			return null;
		}

		return filtered(data[0], { excepted: ['password'] });
	}

	async getByPlaylistUrl(url: string) {
		const data = await db
			.from(Tables.user)
			.where({ playlist_url: url })
			.whereNull(UserTable.deletedAt)
			.then((data: any) => convertCamelKeys(data));

		if (data.length !== 1) {
			return null;
		}
		return filtered(data[0], { excepted: ['password'] });
	}

	async create(user: any) {
		const data = await db
			.from(Tables.user)
			.insert(convertSnakeKeys(user))
			.returning('*')
			.then((data: any) => convertCamelKeys(data));

		return data?.[0];
	}
}

export default new UserService();
