// import { FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { BadRequestException } from '@nestjs/common';

// export const ImageFilesInterceptor = (fieldName: string, maxCount: number = 10) =>
//   FilesInterceptor(fieldName, maxCount, {
//     storage: diskStorage({
//       destination: './uploads',
//       filename: (req, file, callback) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const ext = extname(file.originalname);
//         const filename = `${uniqueSuffix}${ext}`;
//         callback(null, filename);
//       },
//     }),
//     fileFilter: (req, file, callback) => {
//       if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//         return callback(new BadRequestException('Only JPG, JPEG, and PNG files are allowed'), false);
//       }
//       callback(null, true);
//     },
//     limits: {
//       fileSize: 20 * 1024 * 1024, // 20MB limit per file
//     },
//   });