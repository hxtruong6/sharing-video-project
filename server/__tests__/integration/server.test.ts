import request from 'supertest';
import app from '../../app';

describe('[Integration test for Server]', () => {
	it('should response OK', async () => {
		expect.hasAssertions();
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
	});
});
