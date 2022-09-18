import request from 'supertest';
import app from '../../app';

describe('[Integration test for Server]', () => {
	// eslint-disable-next-line jest/no-done-callback
	it('should response OK', async (done:any) => {
		expect.hasAssertions();
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
		done();
	});
});
