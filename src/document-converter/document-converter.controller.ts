import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ApiJsonDocs as ApiJsonDocumentation } from './decorators/json-docs.decorator';
import { ApiTextDocumentation } from './decorators/text-docs.decorator';
import { ApiXmlDocumentation } from './decorators/xml-docs.decorator';
import { JsonDto, TxtDto, XmlDto } from './dtos';
import { TxtConverterService } from './services/txt-converter.service';
import { XmlConverterService } from './services/xml-converter.service';

const XML = 'application/xml';
const TEXT = 'text/plain';
const JSON_TYPE = 'application/json';

const mimeTypeSupported = [XML, TEXT, JSON_TYPE];

@Controller('convert')
@ApiTags('convert')
export class DocumentConverterController {
  constructor(
    private readonly xmlConverter: XmlConverterService,
    private readonly txtConverter: TxtConverterService,
  ) {}

  @Post('json')
  @UseInterceptors(FileInterceptor('file'))
  @ApiJsonDocumentation()
  convertToJsonFormat(
    @Body() { delimiter, separator }: JsonDto,
    @UploadedFile() inputDocument: Express.Multer.File,
  ) {
    if (!inputDocument) {
      throw new BadRequestException('Document for conversion not provided.');
    }

    const inputDoc = inputDocument.buffer.toString();
    const mimeType = inputDocument.mimetype;
    if (mimeTypeSupported.includes(mimeType) === false) {
      throw new BadRequestException('Document type not supported');
    }

    if (mimeType.includes(XML)) {
      const objConversion = this.xmlConverter.toJson(inputDoc);
      return objConversion;
    }

    if (mimeType.includes(TEXT)) {
      if (!delimiter || !separator) {
        throw new BadRequestException(
          'Provide delimiters and separators for txt format',
        );
      }
      const objConversion = this.txtConverter.toJson(
        inputDoc,
        delimiter,
        separator,
      );
      return objConversion;
    }
  }

  @Post('txt')
  @UseInterceptors(FileInterceptor('file'))
  @ApiTextDocumentation()
  convertToTextFormat(
    @Body() { delimiter, separator }: TxtDto,
    @UploadedFile() inputDocument: Express.Multer.File,
  ) {
    if (!inputDocument) {
      throw new BadRequestException('Document for conversion not provided.');
    }

    const inputDoc = inputDocument.buffer.toString();
    const mimeType = inputDocument.mimetype;

    if (mimeTypeSupported.includes(mimeType) === false) {
      throw new BadRequestException('Document type not supported');
    }

    if (mimeType.includes(XML)) {
      const objConversion = this.xmlConverter.toJson(inputDoc);
      return this.txtConverter.toTxt(objConversion, delimiter, separator);
    }

    if (mimeType.includes(JSON_TYPE)) {
      const objConversion = JSON.parse(inputDoc);
      return this.txtConverter.toTxt(objConversion, delimiter, separator);
    }
  }

  @Post('xml')
  @UseInterceptors(FileInterceptor('file'))
  @ApiXmlDocumentation()
  convertToXmlFormat(
    @Body() { delimiter, separator }: XmlDto,
    @UploadedFile() inputDocument: Express.Multer.File,
  ) {
    if (!inputDocument) {
      throw new BadRequestException('Document for conversion not provided.');
    }

    const inputDoc = inputDocument.buffer.toString();
    const mimeType = inputDocument.mimetype;

    if (mimeTypeSupported.includes(mimeType) === false) {
      throw new BadRequestException('Document type not supported');
    }

    if (mimeType.includes(TEXT)) {
      if (!delimiter || !separator) {
        throw new BadRequestException(
          'Provide delimiters and separators for txt format',
        );
      }
      const objConversion = this.txtConverter.toJson(
        inputDoc,
        delimiter,
        separator,
      );
      return this.xmlConverter.toXml(objConversion);
    }

    if (mimeType.includes(JSON_TYPE)) {
      const objConversion = JSON.parse(inputDoc);
      return this.xmlConverter.toXml(objConversion);
    }
  }
}
