/* eslint-disable jest/no-done-callback */
/* eslint-disable jest/no-commented-out-tests */
import request from 'supertest';
import app from '../../app';
import { ApiStatus } from '../../constants/apiConstant';
import { timestamp, USER_BASE_URL, VIDEO_BASE_URL } from './constants';

let user: any = {
	email: `inte_test_user_${new Date().getTime()}__video@gmail.com`,
	password: 'pass_123',
};
let token;

beforeAll(async () => {
	await request(app)
		.post(`${USER_BASE_URL}/register`)
		.send(user)
		.expect(200)
		.then((response) => {
			// eslint-disable-next-line jest/no-standalone-expect
			expect(response.body?.status).toBe(ApiStatus.Success);
		});

	const data = await request(app).post('/api/user/login').send(user).expect(200);

	token = data.body.data?.token;
	// eslint-disable-next-line jest/no-standalone-expect
	expect(token).not.toBeNull();
	user = { ...user, ...data.body.data };
	// eslint-disable-next-line jest/no-standalone-expect
	expect(user).toBeTruthy();
});

describe('video integration tests', () => {
	const initOne = {
		name: `video test ${new Date().getTime()}`,
		url: `https://www.youtube.com/watch?v=b4eBeVC9i0I__${timestamp()}` // prevent unique url
	};
	let createdone: any;

	it('[CREATE] Create new video by user', async (done) => {
		expect.hasAssertions();

		const response = await request(app)
			.post(`${VIDEO_BASE_URL}`)
			.set('Authorization', `Bearer ${token}`)
			.send(initOne)
			.expect(200);

		expect(response.body.status).toBe(ApiStatus.Success);
		createdone = response.body?.data;
		expect(createdone?.url).toBe(initOne.url);
		expect(createdone.createdBy).toBe(user.id);

		done();
	});
});
