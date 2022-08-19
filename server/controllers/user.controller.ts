import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import apiMessage, { ApiMessage, UserApiMessage } from '../constants/apiMessage';
import { USER_ROLE, USER_TYPE } from '../constants/constants';
import { UserTable } from '../constants/schema';
import userService from '../services/user.service';
import { copyObject, hashPassword } from '../utils/commonFuncs';
import { errorRes, failRes, successRes } from '../utils/standardResponse';

class UserController {
	async login(req: Request, res: Response) {
		try {
			let { userName } = req.body;
			const { password } = req.body;

			userName = String(userName).trim();

			const user = await userService.getByUserName(userName, true);
			// console.log(user);

			if (user) {
				const isPasswordMatching = await bcrypt.compare(password, user.password);
				if (isPasswordMatching) {
					delete user.password;

					// TODO: add role later in jwt.sign
					const accessTokenSecret: any = process.env.JWT_SECRET;
					const accessToken = jwt.sign(
						{ userName: user.userName, id: user.id },
						accessTokenSecret,
						{
							expiresIn: 60 * 60 * 24, // 1 day
						}
					);

					return successRes(res, { ...user, token: accessToken });
				}
				return failRes(res, { message: UserApiMessage.WRONG_PASSWORD });
			}
			return failRes(res, { message: UserApiMessage.USERNAME_NOT_FOUND });
		} catch (error) {
			return errorRes(res, error);
		}
	}

	async register(req: Request, res: Response) {
		try {
			// TODO: uncomment to creating Admin user
			// const adminRole = USER_ROLE.ADMIN;
			const adminRole = null;

			let { userName } = req.body;

			const { password, userType } = req.body;
			userName = String(userName).trim();
			// TODO: create user by userName here

			if (!userName) {
				return errorRes(res, { message: apiMessage.Common.BAD_REQUEST });
			}

			const existedUser = await userService.getByUserName(userName);
			if (existedUser) {
				return failRes(res, { message: UserApiMessage.EXIST_USERNAME });
			}
			const hashedPassword = await hashPassword(password);

			const userData = {
				...req.body,
				userName,
				password: hashedPassword,
				playlistUrl: userName,
			};
			console.log(userData);

			const user = await userService.create(userData);

			return successRes(res, copyObject(user, [UserTable.password]));
		} catch (error) {
			return errorRes(res, error);
		}
	}

	async get(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) {
				return failRes(res, { message: ApiMessage.MISSING_ID });
			}

			const data = await userService.getById(Number(id));
			if (!data) {
				return failRes(res, { message: ApiMessage.NOT_FOUND });
			}
			return successRes(res, data);
		} catch (error) {
			return errorRes(res, error);
		}
	}

	// update = async (req: Request, res: Response) => {
	// 	try {
	// 		const product = req.body;
	// 		if (!product || !product.id) {
	// 			return failRes(res, { message: ApiMessage.MISSING_ID });
	// 		}

	// 		const data = await db
	// 			.from(Tables.product)
	// 			.where({ id: product.id })
	// 			.update(convertSnakeKeys(product))
	// 			.returning('*');

	// 		if (data && data.length === 0) {
	// 			return failRes(res, { message: ApiMessage.INVALID_ID });
	// 		}
	// 		return successRes(res, { product: convertCamelKeys(data) });
	// 	} catch (error) {
	// 		return errorRes(res, error);
	// 	}
	// };

	// remove = async (req: Request, res: Response) => {
	// 	try {
	// 		const { id } = req.params;
	// 		if (!id) {
	// 			return failRes(res, { message: ApiMessage.MISSING_ID });
	// 		}

	// 		const data = await db
	// 			.from(Tables.product)
	// 			.where({ id })
	// 			.update(convertSnakeKeys({ deletedAt: new Date() }))
	// 			.returning([ProductTable.id]);
	// 		if (data && data.length === 0) {
	// 			return failRes(res, { message: ApiMessage.INVALID_ID });
	// 		}
	// 		return successRes(res, { product: convertCamelKeys(data[0]) });
	// 	} catch (error) {
	// 		return errorRes(res, error);
	// 	}
	// };
}
export default new UserController();
