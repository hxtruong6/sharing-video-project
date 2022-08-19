import envConfig from './env.config';

const pqConnStr = envConfig.DB_URL_DEV
	? envConfig.DB_URL_DEV
	: `postgres://${envConfig.DB_USER_NAME}:${envConfig.DB_PASS}@${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}`;

console.log('DB: ', pqConnStr);

export default pqConnStr;
