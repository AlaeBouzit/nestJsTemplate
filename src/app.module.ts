import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:  "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) ,
      username:  process.env.DATABASE_USER,
      password:  process.env.DATABASE_PASSWORD,
      database:  process.env.DATABASE_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(){
    
  }
}
