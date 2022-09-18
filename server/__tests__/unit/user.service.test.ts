import userService from '../../services/user.service';

const userName = `unit_test_user_${new Date().getTime()}`;
const password = 'unit-test-user-password';

describe('unit test for Server', () => {
	it('create user in Database', async () => {
		expect.hasAssertions();
		const response = await userService.create({ user_name: userName, password });

		// console.log(response);
		expect(response).toBeTruthy();
	});
});
