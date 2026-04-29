import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const serviceAccountPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  resolve(projectRoot, 'secrets/firebase-service-account.json');

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

export const adminApp =
  getApps()[0] ||
  initializeApp({
    credential: cert(serviceAccount),
  });

export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
