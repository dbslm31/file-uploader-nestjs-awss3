# File Uploader Project

## Description

The **File Uploader** project is an application developed with **NestJS** that allows users to upload, retrieve, list, and delete files in an Amazon S3 bucket. It uses `multer-s3` for file uploads and the AWS SDK to interact with S3.

## Features

- Upload files to S3
- Retrieve files from S3
- List available files in S3
- Delete files from S3

## Prerequisites

- Node.js (version 14 or higher)
- TypeScript
- AWS SDK
- NestJS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/file-uploader.git
   cd file-uploader

2. Install depedencies:

   ```bash
   npm install

3. Configure your environment variables in a .env file at the root of the project. Here is an example of the content:

   ```bash
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_aws_region
   AWS_BUCKET_NAME=your_bucket_name

## Usage

1. Start the application:

   ```bash
   npm run strat:dev

2. To upload a file, make a POST request to /file/upload with the file as form-data:

   ```bash
   POST /file/upload
   Content-Type: multipart/form-data
   file: [your_file.pdf]

3. To retrieve a file, make a GET request to /file/:fileName:

   ```bash
   GET /file/test-file.pdf

4. To list all files, make a GET request to /file:

   ```bash
   GET /file

5. To delete a file, make a DELETE request to /file/:fileName:

   ```bash
   DELETE /file/test-file.pdf
