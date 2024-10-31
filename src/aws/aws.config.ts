import * as AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export const s3 = new S3Client({ region: process.env.AWS_REGION });
