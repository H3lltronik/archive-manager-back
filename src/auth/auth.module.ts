import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
	providers: [AuthService, LocalStrategy, SessionSerializer],
	imports: [UserModule, PassportModule.register({ session: true })],
	controllers: [AuthController],
})
export class AuthModule {}
