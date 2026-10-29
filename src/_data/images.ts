import { existsSync } from 'node:fs';
import { join } from 'node:path';

const EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'avif'] as const;

export function findPublicImage(name: string): string | null {
  if (!/^[a-z0-9-]+$/.test(name)) return null;

  const directory = join(process.cwd(), 'public', 'images');

  for (const extension of EXTENSIONS) {
    const filename = `${name}.${extension}`;
    if (existsSync(join(directory, filename))) {
      return `/images/${filename}`;
    }
  }

  return null;
}
