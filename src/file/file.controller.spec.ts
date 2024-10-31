import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import * as multerS3 from 'multer-s3';

describe('FileController', () => {
  let controller: FileController;
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockResponse = {
      setHeader: jest.fn(),
      json: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: S3,
          useValue: {
            send: jest.fn().mockResolvedValue({
              Body: {
                location: 'http://example.com/file.pdf',
              },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and return the file URL', async () => {
      const mockFile = {
        location: 'http://example.com/file.pdf',
      } as Express.MulterS3.File;

      const result = await controller.uploadFile(mockFile as any);

      expect(result).toEqual({ url: mockFile.location });
    });
  });
});
