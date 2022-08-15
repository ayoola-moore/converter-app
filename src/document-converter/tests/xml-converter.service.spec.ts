import { Test, TestingModule } from '@nestjs/testing';
import { XmlConverterService } from '../services/xml-converter.service';
import { jsonSampleObj, xmlSampleString } from './test-helpers';

describe('DocumentToObjService', () => {
  let service: XmlConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XmlConverterService],
    }).compile();

    service = module.get<XmlConverterService>(XmlConverterService);
  });

  it('should find XML format converter service', () => {
    expect(service).toBeDefined();
  });

  it('should convert to Xml given a text string', () => {
    // todo: with more time I would have written multiple text to convert text to obj and then obj to xml
    const xml = service.toXml(jsonSampleObj);
    const recieved = `${xml}`.trim();
    const expected = `${xmlSampleString}`.trim();
    expect(recieved.length).toEqual(expected.length);
  });
});
