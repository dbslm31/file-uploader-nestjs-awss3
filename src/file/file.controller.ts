import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { s3 } from '../aws/aws.config';

@Controller('file')
export class FileController {


    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multerS3({
                s3: s3,
                bucket: process.env.AWS_BUCKET_NAME || "file-uploader-project-0502",
                key: (request, file, cb) => {
                    cb(null, `${Date.now().toString()}_${file.originalname}`);
                },
            }),
        })
    )
    async uploadFile(@UploadedFile() file: Express.MulterS3.File) {
        return {
            url: file.location,
        };
    }
}
