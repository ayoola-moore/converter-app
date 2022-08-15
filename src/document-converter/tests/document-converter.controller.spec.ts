import { Test, TestingModule } from '@nestjs/testing';
import { DocumentConverterController } from '../document-converter.controller';
import { TxtConverterService } from '../services/txt-converter.service';
import { XmlConverterService } from '../services/xml-converter.service';

describe('DocumentConverterController', () => {
  let controller: DocumentConverterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentConverterController],
      providers: [XmlConverterService, TxtConverterService],
    }).compile();

    controller = module.get<DocumentConverterController>(
      DocumentConverterController,
    );
  });

  it('should find the document converter controller', () => {
    expect(controller).toBeDefined();
  });

  it('should find the json format converter endpoint', () => {
    expect(controller.convertToJsonFormat).toBeDefined();
  });

  it('should find the xml format converter endpoint', () => {
    expect(controller.convertToXmlFormat).toBeDefined();
  });

  it('should find the txt format converter endpoint', () => {
    expect(controller.convertToTextFormat).toBeDefined();
  });
});
