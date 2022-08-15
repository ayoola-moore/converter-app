import { Injectable } from '@nestjs/common';

@Injectable()
export class TxtConverterService {
  toJson(inputDocument: string, delimiter: string, seperator: string): object {
    const baseObj = {};
    inputDocument
      .split(delimiter)
      .filter((segment) => segment.trim())
      .forEach((segment) => {
        const splitSegment = segment.split(seperator);
        const segmentName = splitSegment[0];
        baseObj[segmentName] = {};
        splitSegment.slice(1).forEach((element, i) => {
          baseObj[segmentName][`${segmentName}${i + 1}`] = element;
        });
      });
    return baseObj;
  }

  toTxt(inputDocument: object, delimiter: string, seperator: string): string {
    const segments: string[] = [];

    Object.keys(inputDocument).forEach((segmentKey) => {
      const elements: string[] = [segmentKey];
      Object.keys(inputDocument[segmentKey]).forEach((elementKey) => {
        elements.push(inputDocument[segmentKey][elementKey]);
      });
      segments.push(elements.join(seperator));
    });
    return segments.join(delimiter) + delimiter;
  }
}
