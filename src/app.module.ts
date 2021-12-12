import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import config from 'ormconfig';
import { UserModule } from './user/user.module';
import { RecoverModule } from './recover/recover.module';

@Module({
	imports: [
		AuthModule,
		FilesModule,
		UserModule,
		RecoverModule,
		TypeOrmModule.forRoot(config),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
