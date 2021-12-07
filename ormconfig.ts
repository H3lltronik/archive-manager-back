import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
	type: 'mariadb',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'archive-manager',
	synchronize: true,
	entities: ['dist/src/**/*.entity.js'],
	migrations: ['dist/src/db/migrations/*.js'],
	cli: {
		migrationsDir: 'src/db/migrations',
	},
};

export default config;
