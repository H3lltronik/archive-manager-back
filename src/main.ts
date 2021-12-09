import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(
		session({
			secret: 'aaa',
			resave: true,
			saveUninitialized: true,
			cookie: { maxAge: 360000 },
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(cookieParser());
	app.useStaticAssets(join(__dirname, '..', '..', 'public'), {
		setHeaders: (res, path, stat) => {
			res.set('Access-Control-Allow-Origin', '*');
		},
	});
	app.enableCors({
		origin: 'localhost:3000',
		credentials: true,
	});
	await app.listen(4000);
}
bootstrap();
