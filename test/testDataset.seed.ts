import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '6246233',
    database: 'Nestjs_test',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  }),
];
