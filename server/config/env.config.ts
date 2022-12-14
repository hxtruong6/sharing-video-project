import * as dotenv from 'dotenv';
import Environment from '../constants/environment';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { env } = process;

console.log('NODE_ENV: ', env.NODE_ENV);

if (env.NODE_ENV === Environment.TEST) {
	console.log = function () {};
	console.info = function () {};
}

const envConfig:any = {
	...env,
	ENVIRONMENT: env.NODE_ENV,
	DB_USER_NAME: env.DB_USER_NAME,
	DB_PASS: env.DB_PASS,
	DB_NAME: env.DB_NAME,
	DB_HOST: env.DB_HOST,
	DB_PORT: env.DB_PORT,
	DB_URL_DEV: env.DB_URL_DEV,
};

export default envConfig;
