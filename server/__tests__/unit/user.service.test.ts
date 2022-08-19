import userService from '../../services/user.service';

const email = 'unit-test-user@gmail.com';
const password = 'unit-test-user-password';

describe('[Integration test for Server]', () => {
	it('create user in Database', async () => {
		expect.hasAssertions();
		const response = await userService.create({ email, password });

		console.log(response);
		expect(response).toBeTruthy();
	});
});
