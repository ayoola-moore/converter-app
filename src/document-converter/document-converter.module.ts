import { Module } from '@nestjs/common';
import { DocumentConverterController } from './document-converter.controller';
import { TxtConverterService } from './services/txt-converter.service';

import { XmlConverterService } from './services/xml-converter.service';

@Module({
  controllers: [DocumentConverterController],
  providers: [XmlConverterService, TxtConverterService],
})
export class DocumentConverterModule {}
