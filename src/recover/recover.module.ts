import { Module } from '@nestjs/common';
import { RecoverService } from './recover.service';
import { RecoverController } from './recover.controller';
import { Recover } from './entities/recover.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Module({
	controllers: [RecoverController],
	providers: [RecoverService],
	imports: [
		TypeOrmModule.forFeature([Recover]),
		TypeOrmModule.forFeature([User]),
	],
})
export class RecoverModule {}
