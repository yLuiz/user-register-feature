import { Module, Global, ValidationPipe } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_PIPE } from '@nestjs/core';
import { UtilsService } from './utils/utils.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    CustomersModule,
    HttpModule
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    UtilsService,
  ],
  exports: [
    PrismaService,
    UtilsService
  ]
})
export class AppModule {}
