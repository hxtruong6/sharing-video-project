import tunnel from 'tunnel-ssh';
import Knex, { Knex as KnexType } from 'knex';
import { log } from 'console';
import envConfig from '../config/env.config';
import knexConfig from '../knexfile';

const environment = envConfig.ENVIRONMENT || 'development';

// const sshConfig = {
// 	username: envConfig.SSH_USER_NAME,
// 	password: envConfig.SSH_PASSWORD,
// 	host: envConfig.SSH_HOST,
// 	port: envConfig.SSH_PORT,
// 	// keepaliveInterval: 60000,
// 	// keepAlive: true,
// 	dstHost: '127.0.0.1', // ip of remote host
// 	dstPort: 5433, // port of remote host. Here is postgresql port
// 	localHost: '127.0.0.1',
// 	localPort: 5433
// };

// eslint-disable-next-line import/no-mutable-exports
// let db!:KnexType;

const db = Knex(knexConfig[environment]);

db.raw('SELECT 1')
	.then(() => {
		console.log('PostgreSQL connected');
	})
	.catch((e: any) => {
		console.log('PostgreSQL not connected');
		console.error(e);
	});
// log('db: ', db);

// const tnl = tunnel(sshConfig, async (err: any, server: any) => {
// 	if (err) {
// 		console.error('SSH Tunel: ', err);
// 		throw err;
// 	}
// 	log('SSH Connect successful!');
// 	// write what you want to do through tunnel.

// 	db = Knex(knexConfig[environment]);

// 	db.raw('SELECT 1')
// 		.then(() => {
// 			console.log('PostgreSQL connected');
// 		})
// 		.catch((e: any) => {
// 			console.log('PostgreSQL not connected');
// 			console.error(e);
// 		});
// });

// setTimeout(async () => {
// 	const it = await db.from('banner').select('*');
// 	log('db122: ', it.map((i) => i.slug));
// }, 5000);

export default db;
