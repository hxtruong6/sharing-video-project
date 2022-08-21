import Environment from '../constants/environment';
import envConfig from './env.config';

const pqConnStr = envConfig.DB_URL_DEV
	? envConfig.DB_URL_DEV
	: `postgres://${envConfig.DB_USER_NAME}:${envConfig.DB_PASS}@${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}`;

if (envConfig.NODE_ENV === Environment.TEST) console.log('DB: ', pqConnStr);

const createUnixSocketPoolConnection = () => ({
	user: 'postgres', // e.g. 'my-user'
	password: 'postgres', // e.g. 'my-user-password'
	database: 'sharing-video', // e.g. 'my-database'
	host: '/cloudsql/remini-video-sharing:asia-southeast1:sharing-video',
});

const createTcpPool = () => ({
	host: '127.0.0.1', // e.g. '127.0.0.1'
	port: 5432, // e.g. '5432'
	user: 'postgres', // e.g. 'my-user'
	password: 'postgres', // e.g. 'my-user-password'
	database: 'sharing-video', // e.g. 'my-database'
});

export { createUnixSocketPoolConnection, createTcpPool };

export default pqConnStr;
