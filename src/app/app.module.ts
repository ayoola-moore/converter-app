import { Module } from '@nestjs/common';
import { DocumentConverterModule } from '../document-converter/document-converter.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DocumentConverterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
