import { openDB } from 'idb';

export const saveEpubToIndexedDB = async (id: string, blob: Blob) => {
    if (!id || typeof id !== 'string') {
        throw new Error('Invalid key for IndexedDB');
    }

    const db = await openDB('bookme-reader', 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('books')) {
                db.createObjectStore('books');
            }
        },
    });

    await db.put('books', blob, id);
};

export const getEpubFromIndexedDB = async (
    id: string
): Promise<Blob | undefined> => {
    const db = await openDB('bookme-reader', 2);
    return await db.get('books', id);
};
