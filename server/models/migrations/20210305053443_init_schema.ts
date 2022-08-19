import { Knex } from 'knex';
import Tables from '../../constants/schema';

const onUpdateTrigger = (table: string) => `
    CREATE TRIGGER ${table}_updated_at
      BEFORE UPDATE ON "${table}"
      FOR EACH ROW EXECUTE 
      PROCEDURE on_update_timestamp();
`;

exports.up = async (knex: Knex): Promise<void> => {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

	return knex.schema
		.createTable(Tables.user, (table) => {
			// table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.increments();
			table.string('user_name').unique();
			table.string('password').notNullable();

			table.string('first_name');
			table.string('full_name');
			table.boolean('is_actived').notNullable().defaultTo(true);
			table.string('avatar');
			table.string('playlist_url');

			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at');
			table.timestamp('last_login');
			table.integer('deleted_by');
			table.timestamp('deleted_at');
		})
		.createTable('user_log', (table) => {
			table.increments();
			table.integer('user_id').references('user.id');
			table.string('last_token').unique();
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			table.timestamp('deleted_at');
		})

		.createTable('video', (table) => {
			table.increments();
			table.string('name');
			table.string('url').unique();
			table.text('description');

			table.integer('created_by');
			table.integer('updated_by');
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at');
			table.integer('deleted_by');
			table.timestamp('deleted_at');
		})

		.createTable('video_user', (table) => {
			table.increments();
			table.integer('user_id').references('user.id').notNullable();
			table.integer('video_id').references('video.id').notNullable();
			table.unique(['user_id', 'video_id']);
			table.boolean('is_public').defaultTo('true').notNullable();
			table.integer('like').defaultTo(0);

			table.integer('created_by');
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.integer('updated_by');
			table.timestamp('updated_at');
			table.integer('deleted_by');
			table.timestamp('deleted_at');
		})

		.then(async () => {
			const updateTables = [
				'user',
				'video',
				'video_user'
			];
			const asynsFuncs = Object.keys(updateTables).map(
				(key: string) => knex.raw(onUpdateTrigger((updateTables as any)[key]))
				// eslint-disable-next-line function-paren-newline
			);
			await Promise.all(asynsFuncs);
		});
};

exports.down = async (knex: Knex): Promise<void> => {
	await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');

	let tablesString = '';

	Object.keys(Tables).forEach((key: string) => {
		tablesString += `${(Tables as any)[key]},`;
	});

	return knex.raw(`DROP TABLE IF EXISTS ${tablesString.slice(0, -1)} CASCADE;`);
};
