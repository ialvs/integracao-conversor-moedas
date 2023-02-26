import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "converterDB",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true
  }), UserModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
