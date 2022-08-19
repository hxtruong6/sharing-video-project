/* eslint-disable jest/no-commented-out-tests */
import request from 'supertest';
import app from '../../app';
import { ApiStatus } from '../../constants/apiConstant';

const USER_BASE_URL = '/api/user';

const user: any = {
	userName: `inte_test_user_${new Date().getTime()}`,
	password: 'pass_123',
};

describe('user sign up API', () => {
	it('[CREATE] Register new user', async () => {
		expect.hasAssertions();

		await request(app)
			.post(`${USER_BASE_URL}/register`)
			.send(user)
			.expect(200)
			.then((response) => {
				// console.log('response ', response);
				expect(response.body?.status).toBe(ApiStatus.Success);
			});
	});
});

// Make sure it run test in sequence
describe('user login API', () => {
	let token: any;

	it('[GET] User login', async () => {
		expect.hasAssertions();

		const data = await request(app).post(`${USER_BASE_URL}/login`).send(user).expect(200);

		token = data.body.data?.token;
		expect(token).not.toBeNull();
		const loggedUser = { ...user, ...data.body.data };
		expect(loggedUser).toBeTruthy();
	});
});
