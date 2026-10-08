import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import type { Request } from 'express';
import logger from '../../config/logger.js';

export interface StoredFile {
  fileName: string;
  mimeType: string;
  size: number;
  storageKey: string;
  url: string;
}

export interface StorageProvider {
  saveFile(file: Express.Multer.File): Promise<StoredFile>;
  getFilePath(storageKey: string): string;
  fileExists(storageKey: string): Promise<boolean>;
  deleteFile(storageKey: string): Promise<boolean>;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

class LocalStorageProvider implements StorageProvider {
  private baseDir: string;

  constructor() {
    this.baseDir = path.resolve(process.cwd(), 'uploads', 'support');
    this.ensureBaseDir();
  }

  private ensureBaseDir(): void {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
      logger.info(`[STORAGE] Created uploads directory: ${this.baseDir}`);
    }
  }

  public getFilePath(storageKey: string): string {
    // Sanitize storageKey to prevent path traversal attacks
    const sanitizedKey = path.basename(storageKey);
    return path.join(this.baseDir, sanitizedKey);
  }

  public async fileExists(storageKey: string): Promise<boolean> {
    const filePath = this.getFilePath(storageKey);
    return fs.existsSync(filePath);
  }

  public async saveFile(file: Express.Multer.File): Promise<StoredFile> {
    this.ensureBaseDir();

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new Error(`Unsupported file type: ${file.mimetype}. Allowed types: JPEG, PNG, WEBP.`);
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File exceeds maximum allowed size of 5MB.`);
    }

    // Generate safe UUID-based storage key
    const ext = path.extname(file.originalname).toLowerCase() || '.png';
    const storageKey = `${crypto.randomUUID()}${ext}`;
    const destinationPath = this.getFilePath(storageKey);

    // If multer stored file in memory (buffer) or disk (temp)
    if (file.buffer) {
      await fs.promises.writeFile(destinationPath, file.buffer);
    } else if (file.path) {
      await fs.promises.copyFile(file.path, destinationPath);
      // clean up temp file if needed
      await fs.promises.unlink(file.path).catch(() => {});
    } else {
      throw new Error('File payload missing buffer or path.');
    }

    logger.info(`[STORAGE] Saved file ${file.originalname} -> ${storageKey} (${file.size} bytes)`);

    return {
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storageKey,
      url: `/uploads/support/${storageKey}`,
    };
  }

  public async deleteFile(storageKey: string): Promise<boolean> {
    try {
      const filePath = this.getFilePath(storageKey);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        logger.info(`[STORAGE] Deleted file: ${storageKey}`);
        return true;
      }
      return false;
    } catch (err: any) {
      logger.error(`[STORAGE] Failed to delete file ${storageKey}: ${err.message}`);
      return false;
    }
  }
}

export const storageProvider: StorageProvider = new LocalStorageProvider();

// Multer middleware setup using memory storage for validation before persisting
const memoryStorage = multer.memoryStorage();

export const uploadAttachment = multer({
  storage: memoryStorage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 5,
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type ${file.mimetype}. Only JPEG, PNG, and WEBP images are supported.`));
    }
  },
});

