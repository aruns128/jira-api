import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'passwd',
  database: 'jira-dev',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default databaseConfig;
