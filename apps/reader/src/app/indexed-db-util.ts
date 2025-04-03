import { openDB } from 'idb';

export const saveEpubToIndexedDB = async (key: string, blob: Blob) => {
    if (!key || typeof key !== 'string') {
        throw new Error('Invalid key for IndexedDB');
    }

    const db = await openDB('bookme-reader', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('books')) {
                db.createObjectStore('books');
            }
        },
    });

    await db.put('books', blob, key);
};

export const getEpubFromIndexedDB = async (
    key: string
): Promise<Blob | undefined> => {
    const db = await openDB('bookme-reader', 1);
    return await db.get('books', key);
};
