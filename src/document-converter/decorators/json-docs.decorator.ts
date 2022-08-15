import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
} from '@nestjs/swagger';

export function ApiJsonDocs() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiProduces('application/json'),
    ApiOperation({ summary: 'Use this endpoint to convert to Json' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
          delimiter: {
            type: 'string',
            description:
              'This is required for all txt format and should be a single character eg ~',
          },
          separator: {
            type: 'string',
            description:
              'This is required for all txt format and should be a single characte eg *',
          },
        },
        required: ['file'],
      },
    }),
  );
}
