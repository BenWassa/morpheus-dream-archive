import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { FieldValue } from 'firebase-admin/firestore';

import { adminDb, adminStorage } from './firebase-admin.js';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));

const args = new Map(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith('--') && arg.includes('='))
    .map((arg) => {
      const [key, ...value] = arg.slice(2).split('=');
      return [key, value.join('=')];
    })
);

const benUid = args.get('uid') || process.env.BEN_UID;
const dryRun = process.argv.includes('--dry-run');

if (!benUid) {
  throw new Error('BEN_UID is required. Pass BEN_UID=... or --uid=...');
}

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

const readLocalEnv = async (names) => {
  try {
    const envText = await readFile(resolve(projectRoot, '.env.local'), 'utf8');
    for (const name of names) {
      const match = envText.match(new RegExp(`^${name}=(.+)$`, 'm'));
      if (match) return match[1].replace(/^["']|["']$/g, '').trim();
    }
  } catch {
    // .env.local is optional for one-off scripts.
  }
  return null;
};

const getBucket = async () => {
  const bucketName =
    args.get('bucket') ||
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.VITE_FIREBASE_STORAGE_BUCKET ||
    (await readLocalEnv(['FIREBASE_STORAGE_BUCKET', 'VITE_FIREBASE_STORAGE_BUCKET']));

  if (!bucketName) {
    throw new Error(
      'Firebase Storage bucket is required. Pass FIREBASE_STORAGE_BUCKET=..., VITE_FIREBASE_STORAGE_BUCKET=..., or --bucket=...'
    );
  }

  return adminStorage.bucket(bucketName);
};

const downloadUrlFor = (bucketNameValue, objectPath, token) => {
  const encodedPath = encodeURIComponent(objectPath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucketNameValue}/o/${encodedPath}?alt=media&token=${token}`;
};

const uploadSceneImage = async (bucket, imagePath) => {
  if (!imagePath) return null;

  const filename = basename(imagePath);
  const sourcePath = resolve(projectRoot, 'public', 'images', filename);
  const destination = `users/${benUid}/images/${filename}`;
  const token = randomUUID();

  if (!dryRun) {
    await bucket.upload(sourcePath, {
      destination,
      metadata: {
        contentType: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });
  }

  return downloadUrlFor(bucket.name, destination, token);
};

const migrate = async () => {
  const bucket = await getBucket();
  const indexPath = resolve(projectRoot, 'public', 'index.json');
  const index = await readJson(indexPath);
  const dates = index.entries || [];

  for (const date of dates) {
    const entryPath = resolve(projectRoot, 'public', 'entries', `${date}.json`);
    const entry = await readJson(entryPath);

    const scenes = await Promise.all(
      (entry.scenes || []).map(async (scene) => ({
        ...scene,
        image: await uploadSceneImage(bucket, scene.image),
      }))
    );

    const entryDoc = {
      ...entry,
      scenes,
      userId: benUid,
      createdAt: FieldValue.serverTimestamp(),
    };

    if (!dryRun) {
      await adminDb.doc(`users/${benUid}/entries/${date}`).set(entryDoc);
    }

    console.log(`${dryRun ? '[dry-run] ' : ''}Migrated ${date}`);
  }

  console.log(`${dryRun ? '[dry-run] ' : ''}Migration complete: ${dates.length} entries`);
};

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
