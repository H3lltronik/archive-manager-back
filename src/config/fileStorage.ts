import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const destinationString = './public/files/';

export class FilesStorage {
	static customFileName(req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		let fileExtension = '';
		if (file.mimetype.indexOf('jpeg') > -1) {
			fileExtension = 'jpg';
		} else if (file.mimetype.indexOf('png') > -1) {
			fileExtension = 'png';
		}
		const originalName = file.originalname.split('.')[0];
		cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
	}

	static destinationPath(req, file, cb) {
		cb(null, destinationString);
	}

	static configuration(): MulterOptions {
		return {
			storage: diskStorage({
				destination: this.destinationPath,
				filename: this.customFileName,
			}),
		};
	}
}
