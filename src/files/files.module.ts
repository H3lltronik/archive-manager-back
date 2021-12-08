import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
	controllers: [FilesController],
	providers: [FilesService],
	imports: [
		TypeOrmModule.forFeature([File]),
		TypeOrmModule.forFeature([User]),
	],
})
export class FilesModule {}
