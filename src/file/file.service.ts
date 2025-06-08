import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, unlink, writeFile } from 'fs';
import { extname, resolve, join } from 'path';
import config from 'src/config';
import { handleError } from 'src/utils/catch-error';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  private readonly filePath = resolve(__dirname, '..', '..', '..', 'uploads');
  private readonly baseUrl = config.BASE_URL;

  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const ext = extname(file.originalname);
      const fileName = `${this.baseUrl}${file.originalname.split('.')[0]}__${v4()}${ext.toLowerCase()}`;

      if (!existsSync(this.filePath)) {
        mkdirSync(this.filePath, { recursive: true });
      }
      new Promise<void>((res, rej) => {
        writeFile(join(this.filePath, fileName), file.buffer, (err) => {
          if (err) rej(err);
          res();
        });
      });
      return `${this.baseUrl}${fileName}`;
    } catch (error) {
      return handleError(error);
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      fileName = fileName.split(this.baseUrl)[1];
      const file = resolve(this.filePath, fileName);
      if (!existsSync(file)) {
        throw new BadRequestException(`Files does not exist: ${file}`);
      }
      await new Promise<void>((res, rej) => {
        unlink(file, (err) => {
          if (err) rej(err);
          res();
        });
      });
    } catch (error) {
      handleError(error);
    }
  }
}
