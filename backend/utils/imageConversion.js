// utils/imageConversion.js

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { __dirname } from './dirname.js';
const convertToWebp = async (imagePath, baseUrl) => {
  // Parse the input image path to get the file extension and filename
  const { name } = path.parse(imagePath);
  try {
    const rembgOutput = await sharp(imagePath)
      .resize({ width: 350, height: 350, fit: 'cover', position: 'top', background: { r: 51, g: 51, b: 51, alpha: 0.50 } })
      .modulate({ brightness: 1.1, contrast: 100 })
      .toBuffer();

    const originalFilename = path.basename(name);
    const rembgImagePath = `uploads/${originalFilename}.webp`;
    await sharp(rembgOutput).webp().toFile(path.join(__dirname, '..', rembgImagePath));
    await fs.unlink(imagePath);

    return `${baseUrl}/${rembgImagePath}`;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { convertToWebp };
