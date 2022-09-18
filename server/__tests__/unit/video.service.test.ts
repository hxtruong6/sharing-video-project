import videoService from '../../services/video.service';

describe('unit test for Video service', () => {
	it('checking get all sharing videos', async () => {
		expect.hasAssertions();
		const response = await videoService.getAll();

		// console.log(response);
		expect(response).toBeTruthy();
	});
});
