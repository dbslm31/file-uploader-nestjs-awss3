import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { FileController } from './file/file.controller';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FileModule
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule { }
