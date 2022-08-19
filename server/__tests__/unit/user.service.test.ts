import userService from '../../services/user.service';

const email = `unit_test_user_${new Date().getTime()}@gmail.com`;
const password = 'unit-test-user-password';

describe('unit test for Server', () => {
	it('create user in Database', async () => {
		expect.hasAssertions();
		const response = await userService.create({ email, password });

		// console.log(response);
		expect(response).toBeTruthy();
	});
});
