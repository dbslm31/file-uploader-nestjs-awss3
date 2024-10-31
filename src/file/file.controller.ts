import { Controller, Post, UseInterceptors, UploadedFile, Get, Delete, Param, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as multerS3 from 'multer-s3';
import { s3 } from '../aws/aws.config';
import { S3Client, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { Readable } from 'stream';


@Controller('file')
export class FileController {
    private readonly s3Client: S3Client;

    constructor() { s3 }

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
    @Get(':fileName')
    async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
        });

        try {
            const data = await s3.send(command);

            //Vérify if it's readble stream
            if (data.Body instanceof Readable) {
                //Set the headers for content to read
                res.setHeader('Content-Type', 'application/pdf');
                data.Body.pipe(res);
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Le fichier n'est pas un stream` });
            }
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erreur lors de la récupération du fichier' });
        }
    }

    @Get()
    async getAllFiles() {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME || "file-uploader-project-0502",
        });

        try {
            const response = await this.s3Client.send(command);

            //Return files list
            return response.Contents?.map(file => ({
                Key: file.Key,
                LastModified: file.LastModified,
                Size: file.Size,
            })) || [];
        } catch (error) {
            console.error("Error retrieving file list:", error);
            throw error;
        }
    }

    @Delete(':fileName')
    async deleteFile(@Param('fileName') fileName: string) {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME || "file-uploader-project-0502",
            Key: fileName,
        });

        try {
            await this.s3Client.send(command);
            return { message: `File deleted successfully: ${fileName}` };
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }
}
