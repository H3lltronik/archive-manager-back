// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

const pass = encodeURIComponent('passwordsecret');

const config: MongoConnectionOptions = {
	type: 'mongodb',
	url: `mongodb+srv://h3lltronik:${pass}@cluster0.rap5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
	useNewUrlParser: true,
	username: 'h3lltronik',
	password: pass,
	synchronize: true,
	entities: ['dist/src/**/*.entity.js'],
	migrations: ['dist/src/db/migrations/*.js'],
	cli: {
		migrationsDir: 'src/db/migrations',
	},
};

export default config;
