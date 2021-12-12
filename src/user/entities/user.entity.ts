import { File } from 'src/files/entities/file.entity';
import { Recover } from 'src/recover/entities/recover.entity';
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@Column()
	level: number;

	@OneToMany(() => File, (file) => file.user)
	files: File[];

	@OneToMany(() => Recover, (recover) => recover.user)
	recoverTokens: Recover[];
}
