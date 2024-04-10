import { join } from 'path';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { gqlErrorFormat } from './error/exception/gqlErrorFormat';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      includeStacktraceInErrorResponses: false,
      installSubscriptionHandlers: true,
      autoTransformHttpErrors: true,
      formatError: gqlErrorFormat,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'default',
          type: configService.get<string>('DB_TYPE') as 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          charset: configService.get<string>('DB_CHARSET'),
          entities: [`dist/**/entities/*.js`],
          synchronize: false,
          logging: true,
          migrations: [`dist/**/migrations/*.js`],
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid DB credentials specified');
        }

        return new DataSource(options);
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RedisModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
