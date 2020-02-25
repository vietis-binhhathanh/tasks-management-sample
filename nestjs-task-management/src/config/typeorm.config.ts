import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';
import { User } from '../auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Binh2602pg',
  database: 'taskmanagement',
  // entities: [__dirname + '/../**/*.entity.ts'],
  entities : [ Task, User ],
  synchronize: true,
}
