import { Injectable } from '@nestjs/common';
import * as xmlParser from 'xml-js';

@Injectable()
export class XmlConverterService {
  toJson(inputDocument: string) {
    const xmlData = (
      xmlParser.xml2js(inputDocument, {
        compact: true,
      }) as any
    ).root;

    Object.keys(xmlData).forEach((segmentKey) => {
      Object.keys(xmlData[segmentKey]).forEach((elementKey) => {
        xmlData[segmentKey][elementKey] = xmlData[segmentKey][elementKey]._text;
      });
    });

    return xmlData;
  }

  toXml(parseObj: object): string {
    return xmlParser.js2xml(parseObj, { compact: true });
  }
}
