const Tables = {
	user: 'user',
	userLog: 'user_log',

	video: 'video',
	videoUser: 'videoUser',
};

const BaseModel = {
	id: 'id',

	createdAt: 'created_at',
	createdBy: 'created_by',
	updatedAt: 'updated_at',
	updatedBy: 'updated_by',
	deletedAt: 'deleted_at',
	deletedBy: 'updated_by',
};

const UserTable = {
	...BaseModel,
	firstName: 'first_name',
	fullName: 'full_name',
	email: 'email',
	password: 'password',

	playlistUrl: 'playlist_url'
};

const VideoTable = {
	...BaseModel,
	url: 'url',
	name: 'name',
	description: 'description'
};

const VideoUserTable = {
	...BaseModel,

	like: 'like',
	isPublic: 'is_public'
};

export {
	UserTable,
	VideoTable,
	VideoUserTable
};

export default Tables;
