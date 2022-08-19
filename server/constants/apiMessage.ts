/* eslint-disable max-classes-per-file */
class CommonMessage {
	public NOT_FOUND: string = 'Not found';

	public BAD_REQUEST: string = 'Bad request';

	public INTERNAL_ERROR: string = 'Interal server error';

	public MISSING_ID: string = 'Missing ID in request';

	public MISSING_NAME: string = 'Missing Name in request';

	public MISSING_URL: string = 'Missing URL in request';

	public INVALID_ID: string = 'Invalid ID';

	public INVALID_REQUEST: string = 'Invalid request';

	public ROUTE_NOT_FOUND: string = 'Api not found';

	public GET_FAILED: string = 'Geet failed!';

	public CREATE_FAILED: string = 'Create failed!';

	public UPDATE_FAILED: string = 'Update failed!';

	public DELETE_FAILED: string = 'Delete failed!';
}

class AuthMessage {
	public MISSING_TOKEN: string = 'Missing token';

	public INVALID_TOKEN: string = 'Wrong Token or Token expired ';

	public TOKEN_EXPIRE: string = 'Token is expired';
}

class UserMessage extends CommonMessage {
	public WRONG_PASSWORD: string = 'Wrong password';

	public INVALID_USER: string = 'Invalid user';

	public EMAIL_NOT_FOUND: string = 'Email not found';

	public EXIST_EMAIL: string = 'Exist email. Try with other email';
}

const ApiMessage = new CommonMessage();

const UserApiMessage = new UserMessage();
const AuthApiMessage = new AuthMessage();

class ApiMessages {
	Common = new CommonMessage();

	User = new UserMessage();

	Auth = new AuthMessage();
}

export { ApiMessage, UserApiMessage, AuthApiMessage };
export default new ApiMessages();
