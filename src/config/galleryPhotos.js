import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

/** @typedef {{ image: string, alt: string }} GalleryPhoto */

/**
 * @param {string} folder
 * @param {Record<string, string>} descriptions
 * @param {string} fallbackDescription
 * @returns {Promise<GalleryPhoto[]>}
 */
export async function getGalleryPhotos(folder, descriptions, fallbackDescription) {
  const entries = await readdir(resolve(process.cwd(), 'public', 'images', folder), { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /\.(?:avif|jpe?g|png|webp)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, 'ru', { numeric: true, sensitivity: 'base' }));

  if (files.length === 0) throw new Error(`В галерее ${folder} нет фотографий`);

  return files.map((image, index) => ({
    image,
    alt: descriptions[image] ?? `${fallbackDescription} — фотография ${index + 1}`,
  }));
}
