import { Test, TestingModule } from '@nestjs/testing';
import { TxtConverterService } from '../services/txt-converter.service';
import { jsonSampleObj, textSampleString } from './test-helpers';

describe('TxtConverterService', () => {
  let service: TxtConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxtConverterService],
    }).compile();

    service = module.get<TxtConverterService>(TxtConverterService);
  });

  it('should find text format converter service', () => {
    expect(service).toBeDefined();
  });

  it('should convert text document string to Js Obj(json)', () => {
    const jsonConversion = service.toJson(textSampleString, '~', '*');
    expect(jsonConversion).toEqual(jsonSampleObj);
  });

  it('should convert xml document string to Js Obj(json)', () => {
    const jsonConversion = service.toJson(textSampleString, '~', '*');
    expect(jsonConversion).toEqual(jsonSampleObj);
  });
});
