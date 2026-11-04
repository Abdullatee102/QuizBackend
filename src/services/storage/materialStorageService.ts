import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import logger from '../../config/logger.js';

export interface StoredMaterialFile {
  originalFileName: string;
  mimeType: string;
  fileSizeBytes: number;
  storageKey: string;
  filePath: string;
}

export const ALLOWED_MATERIAL_MIME_TYPES = [
  // Documents / PDFs
  'application/pdf',
  // Word Documents
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // PowerPoint Presentations
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // Text & Markdown
  'text/plain',
  'text/markdown',
  // Images
  'image/jpeg',
  'image/png',
  'image/webp',
  // Compressed Archives
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream',
];

export const ALLOWED_MATERIAL_EXTENSIONS = [
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.txt',
  '.md',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.zip',
];

export const MAX_MATERIAL_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

class MaterialStorageProvider {
  private baseDir: string;

  constructor() {
    this.baseDir = path.resolve(process.cwd(), 'uploads', 'materials');
    this.ensureBaseDir();
  }

  private ensureBaseDir(): void {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
      logger.info(`[MATERIAL_STORAGE] Created uploads directory: ${this.baseDir}`);
    }
  }

  public getFilePath(storageKey: string): string {
    const sanitizedKey = path.basename(storageKey);
    return path.join(this.baseDir, sanitizedKey);
  }

  public async fileExists(storageKey: string): Promise<boolean> {
    const filePath = this.getFilePath(storageKey);
    return fs.existsSync(filePath);
  }

  public async saveFile(file: Express.Multer.File): Promise<StoredMaterialFile> {
    this.ensureBaseDir();

    const ext = path.extname(file.originalname).toLowerCase();
    const isMimeAllowed = ALLOWED_MATERIAL_MIME_TYPES.includes(file.mimetype);
    const isExtAllowed = ALLOWED_MATERIAL_EXTENSIONS.includes(ext);

    if (!isMimeAllowed && !isExtAllowed) {
      throw new Error(
        `Unsupported file type (${file.mimetype || 'unknown'}). Allowed: PDF, Word, PowerPoint, Text, Markdown, Images, and ZIP archives.`
      );
    }

    if (file.size > MAX_MATERIAL_SIZE_BYTES) {
      throw new Error(`File size exceeds the 25 MB maximum limit.`);
    }

    const safeExt = ext || '.bin';
    const storageKey = `${crypto.randomUUID()}${safeExt}`;
    const destinationPath = this.getFilePath(storageKey);

    if (file.buffer) {
      await fs.promises.writeFile(destinationPath, file.buffer);
    } else if (file.path) {
      await fs.promises.copyFile(file.path, destinationPath);
      await fs.promises.unlink(file.path).catch(() => {});
    } else {
      throw new Error('File payload missing buffer or disk path.');
    }

    logger.info(
      `[MATERIAL_STORAGE] Saved ${file.originalname} -> ${storageKey} (${file.size} bytes)`
    );

    return {
      originalFileName: file.originalname,
      mimeType: file.mimetype || 'application/octet-stream',
      fileSizeBytes: file.size,
      storageKey,
      filePath: destinationPath,
    };
  }

  public async deleteFile(storageKey: string): Promise<boolean> {
    try {
      const filePath = this.getFilePath(storageKey);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        logger.info(`[MATERIAL_STORAGE] Deleted file: ${storageKey}`);
        return true;
      }
      return false;
    } catch (err: any) {
      logger.error(`[MATERIAL_STORAGE] Failed to delete file ${storageKey}: ${err.message}`);
      return false;
    }
  }
}

export const materialStorageProvider = new MaterialStorageProvider();

const memoryStorage = multer.memoryStorage();

export const uploadCourseMaterial = multer({
  storage: memoryStorage,
  limits: {
    fileSize: MAX_MATERIAL_SIZE_BYTES,
    files: 1,
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isMimeAllowed = ALLOWED_MATERIAL_MIME_TYPES.includes(file.mimetype);
    const isExtAllowed = ALLOWED_MATERIAL_EXTENSIONS.includes(ext);

    if (isMimeAllowed || isExtAllowed) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file format. Allowed formats: PDF, Word (DOC/DOCX), PowerPoint (PPT/PPTX), Text, Images, and ZIP archives.`
        )
      );
    }
  },
});

export const handleMaterialUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  uploadCourseMaterial.single('file')(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({
            status: 'fail',
            message: 'File size exceeds the 25 MB limit.',
          });
          return;
        }
        res.status(400).json({
          status: 'fail',
          message: `Upload error: ${err.message}`,
        });
        return;
      }
      res.status(400).json({
        status: 'fail',
        message: err.message || 'File upload rejected.',
      });
      return;
    }
    next();
  });
};
